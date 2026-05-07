"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Profile = {
  id: string;
  name: string;
  onboardedAt: number;
  // Reserved for future Supabase integration
  email?: string;
  remoteId?: string;
};

type ProfileState = {
  profile: Profile | null;
  skipped: boolean;
  setProfile: (input: { name: string; email?: string }) => Profile;
  setSkipped: (v: boolean) => void;
  clear: () => void;
};

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      skipped: false,

      setProfile: ({ name, email }) => {
        const trimmed = name.trim();
        if (!trimmed) throw new Error("Nome obrigatório");
        const profile: Profile = {
          id: uid(),
          name: trimmed,
          email: email?.trim() || undefined,
          onboardedAt: Date.now(),
        };
        set({ profile, skipped: false });
        return profile;
      },

      setSkipped: (v) => set({ skipped: v }),

      clear: () => set({ profile: null, skipped: false }),
    }),
    {
      name: "mavs-lanc-profile",
      version: 1,
    }
  )
);
