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
 * Normalises a display name to a stable identifier shared across devices.
 *
 *   "Pedro Sandes Pereira" → "pedro-sandes-pereira"
 *   "  ANA   da Silva " → "ana-da-silva"
 *   "João Côrrea" → "joao-correa"
 *
 * Two students with the same name will land on the same slug — accepted
 * trade-off for a Liga-scale, no-password app.
 */
export function nameSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}
