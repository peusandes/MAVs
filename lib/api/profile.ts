/**
 * Profile API.
 *
 * - Source of truth: Supabase `public.profiles` (keyed by anon auth UUID).
 * - Local Zustand store mirrors the profile for instant UI / offline fallback.
 *
 * If Supabase is not configured or anonymous sign-ins are disabled, every
 * call gracefully degrades to the local store — the app keeps working.
 */

import { useProfile, type Profile } from "@/lib/store/profile";
import { ensureAuth, supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export type { Profile };

type Row = {
  id: string;
  name: string;
  email: string | null;
  created_at: string;
  updated_at: string;
};

function fromRow(row: Row): Profile {
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? undefined,
    onboardedAt: new Date(row.created_at).getTime(),
  };
}

export async function getProfile(): Promise<Profile | null> {
  const cached = useProfile.getState().profile;
  if (!isSupabaseConfigured || !supabase) return cached;
  try {
    const session = await ensureAuth();
    if (!session) return cached;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .maybeSingle();
    if (error) return cached;
    if (data) {
      const profile = fromRow(data as Row);
      useProfile.setState({ profile });
      return profile;
    }
    return cached;
  } catch {
    return cached;
  }
}

export async function saveProfile(input: {
  name: string;
  email?: string;
}): Promise<Profile> {
  const trimmed = input.name.trim();
  if (!trimmed) throw new Error("Nome obrigatório");

  // Optimistic local write so the UI updates instantly (also covers offline).
  const local = useProfile.getState().setProfile(input);

  if (!isSupabaseConfigured || !supabase) return local;

  try {
    const session = await ensureAuth();
    if (!session) return local;

    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: session.user.id,
          name: trimmed,
          email: input.email?.trim() || null,
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (error) {
      console.warn("[profile] save failed, using local:", error.message);
      return local;
    }
    const profile = fromRow(data as Row);
    // Reconcile local store with server canonical row (id from auth).
    useProfile.setState({ profile, skipped: false });
    return profile;
  } catch (err: any) {
    console.warn("[profile] save threw:", err?.message);
    return local;
  }
}

export async function skipOnboarding(): Promise<void> {
  useProfile.getState().setSkipped(true);
}

export async function clearProfile(): Promise<void> {
  // Local-only: keeps the anonymous auth session so the user retains the same
  // UUID and progress server-side. The OnboardingGate re-opens to allow them
  // to enter a new name (which UPSERTs the profile row).
  useProfile.getState().clear();
}
