"use client";

import * as React from "react";
import { ensureAuth, isSupabaseConfigured } from "@/lib/supabase/client";
import { getProfile } from "@/lib/api/profile";
import { hydrateProgress } from "@/lib/api/progress";

/**
 * On mount:
 *   1. Ensures an anonymous Supabase session exists.
 *   2. Pulls the user's profile and progress and merges into the local store.
 *
 * Renders nothing. Everything runs once, side-effect only.
 */
export function BackgroundSync() {
  React.useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const session = await ensureAuth();
        if (!session || cancelled) return;
        await Promise.all([getProfile(), hydrateProgress()]);
      } catch (err) {
        // Logged at the lower layers; nothing to recover here.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
