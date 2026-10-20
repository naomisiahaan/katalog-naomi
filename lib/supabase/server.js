import { createClient } from "@supabase/supabase-js";

/**
 * Membuat koneksi Supabase di sisi server.
 * Digunakan untuk membaca data publik (seperti katalog dan detail produk)
 * memakai SUPABASE_SECRET_KEY dari environment variable.
 */
export function buatKoneksiServer() {
  const rawUrl = process.env.SUPABASE_URL;
  const rawKey = process.env.SUPABASE_SECRET_KEY;

  if (!rawUrl || !rawKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  let cleanUrl = rawUrl.trim();
  if (
    (cleanUrl.startsWith('"') && cleanUrl.endsWith('"')) ||
    (cleanUrl.startsWith("'") && cleanUrl.endsWith("'"))
  ) {
    cleanUrl = cleanUrl.slice(1, -1).trim();
  }
  cleanUrl = cleanUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  let cleanKey = rawKey.trim();
  if (
    (cleanKey.startsWith('"') && cleanKey.endsWith('"')) ||
    (cleanKey.startsWith("'") && cleanKey.endsWith("'"))
  ) {
    cleanKey = cleanKey.slice(1, -1).trim();
  }

  return createClient(cleanUrl, cleanKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

