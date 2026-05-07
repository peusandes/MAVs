"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!url && !!key;

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, key!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "mavs-lanc-auth",
      },
      global: {
        headers: { "x-client-info": "mavs-lanc" },
      },
    })
  : null;

/**
 * Ensures we have an auth session — creates an anonymous one if needed.
 * Returns null if Supabase is not configured or if anonymous sign-ins are
 * disabled in the project. Callers should treat null as "offline mode" and
 * fall back to local-only behaviour.
 */
export async function ensureAuth() {
  if (!supabase) return null;
  const { data: existing } = await supabase.auth.getSession();
  if (existing.session) return existing.session;
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.warn(
      "[supabase] anonymous sign-in failed — running in local-only mode:",
      error.message
    );
    return null;
  }
  return data.session;
}
