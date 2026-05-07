/**
 * Profile API.
 *
 * Identity model: a normalised name slug. Two students who type the same
 * name (case / accent insensitive) share a profile and a dataset across
 * any browser or device. There's no auth, no PIN, no email — just a name.
 *
 * If Supabase isn't reachable, every call falls through to the local
 * Zustand store so the app keeps working offline.
 */

import { useProfile, type Profile } from "@/lib/store/profile";
import { supabase, isSupabaseConfigured, nameSlug } from "@/lib/supabase/client";

export type { Profile };

type Row = {
  id: string;
  display_name: string;
  email: string | null;
  created_at: string;
  updated_at: string;
};

function fromRow(row: Row): Profile {
  return {
    id: row.id,
    name: row.display_name,
    email: row.email ?? undefined,
    onboardedAt: new Date(row.created_at).getTime(),
  };
}

export async function getProfile(): Promise<Profile | null> {
  const cached = useProfile.getState().profile;
  if (!cached || !isSupabaseConfigured || !supabase) return cached;

  // Refresh display_name / email from the server (might have been edited
  // on another device).
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", cached.id)
      .maybeSingle();
    if (error || !data) return cached;
    const profile = fromRow(data as Row);
    useProfile.setState({ profile });
    return profile;
  } catch {
    return cached;
  }
}

export async function saveProfile(input: {
  name: string;
  email?: string;
}): Promise<Profile> {
  const display = input.name.trim();
  if (!display) throw new Error("Nome obrigatório");
  const slug = nameSlug(display);
  if (!slug) throw new Error("Nome inválido");

  const local: Profile = {
    id: slug,
    name: display,
    email: input.email?.trim() || undefined,
    onboardedAt: Date.now(),
  };

  // Optimistic local write (also covers offline mode).
  useProfile.setState({ profile: local, skipped: false });

  if (!isSupabaseConfigured || !supabase) return local;

  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: slug,
          display_name: display,
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
  // Local-only: clears the cached identity so the OnboardingGate re-opens.
  // The remote profile and its data remain — re-entering the same name
  // recovers them on any device.
  useProfile.getState().clear();
}
