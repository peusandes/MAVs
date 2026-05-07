"use client";

import * as React from "react";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { useProfile } from "@/lib/store/profile";
import { getProfile } from "@/lib/api/profile";
import { hydrateProgress } from "@/lib/api/progress";

/**
 * On mount and on profile changes:
 *   - If a profile exists locally, refresh it from the server and pull the
 *     full progress history attached to that name slug.
 *
 * Renders nothing.
 */
export function BackgroundSync() {
  const profileId = useProfile((s) => s.profile?.id);

  React.useEffect(() => {
    if (!isSupabaseConfigured || !profileId) return;
    let cancelled = false;
    (async () => {
      try {
        await Promise.all([getProfile(), hydrateProgress()]);
        if (cancelled) return;
      } catch {
        // Errors are logged at the lower layers.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [profileId]);

  return null;
}
