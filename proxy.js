import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Proxy proteksi rute (Next.js 16) untuk rute /admin.
 * Menggunakan Supabase Auth dan cookie sesi.
 * Semua rute di bawah /admin (kecuali /admin/login) dialihkan ke /admin/login jika belum login.
 */
export async function proxy(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const rawUrl = process.env.SUPABASE_URL;
  const rawKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!rawUrl || !rawKey) {
    return response;
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

  const supabase = createServerClient(cleanUrl, cleanKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const cleanPath = pathname.replace(/\/+$/, "") || "/";

  // Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth
  if (cleanPath.startsWith("/admin") && cleanPath !== "/admin/login") {
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Jika admin sudah login dan mengakses /admin/login, arahkan ke /admin
  if (cleanPath === "/admin/login" && user) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return response;
}

export const middleware = proxy;
export default proxy;

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

