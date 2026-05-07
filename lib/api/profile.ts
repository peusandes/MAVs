/**
 * Profile API — abstraction layer.
 *
 * Today these functions read from / write to the local Zustand store,
 * which is persisted to localStorage. When the Supabase integration
 * lands, the implementations swap to Supabase calls without changing
 * any UI code that depends on this module.
 *
 * Keep these functions returning Promises so the callsites are already
 * async-ready.
 */

import { useProfile, type Profile } from "@/lib/store/profile";

export type { Profile };

export async function getProfile(): Promise<Profile | null> {
  return useProfile.getState().profile;
}

export async function saveProfile(input: {
  name: string;
  email?: string;
}): Promise<Profile> {
  const next = useProfile.getState().setProfile(input);
  return next;
}

export async function skipOnboarding(): Promise<void> {
  useProfile.getState().setSkipped(true);
}

export async function clearProfile(): Promise<void> {
  useProfile.getState().clear();
}
