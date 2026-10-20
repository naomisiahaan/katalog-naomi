"use server";

import { redirect } from "next/navigation";
import { buatKoneksiAdmin } from "@/lib/supabase/admin";

/**
 * Server Action untuk login admin memakai Supabase Auth.
 */
export async function loginAdmin(prevStateOrFormData, maybeFormData) {
  const formData = maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;
  const email = formData?.get?.("email")?.toString()?.trim();
  const password = formData?.get?.("password")?.toString();

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  let pesanError = null;

  try {
    const supabase = await buatKoneksiAdmin();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("invalid login credentials")) {
        pesanError = "Email atau password salah.";
      } else {
        pesanError = error.message || "Gagal masuk. Periksa kembali email dan password Anda.";
      }
    } else if (!data?.session) {
      pesanError = "Gagal membuat sesi login.";
    }
  } catch (err) {
    if (err.message === "NEXT_REDIRECT" || err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    pesanError = err.message || "Terjadi kesalahan pada server saat login.";
  }

  if (pesanError) {
    return { error: pesanError };
  }

  redirect("/admin");
}

/**
 * Server Action untuk mengakhiri sesi admin (logout) dan kembali ke /admin/login.
 */
export async function keluarAdmin() {
  try {
    const supabase = await buatKoneksiAdmin();
    await supabase.auth.signOut();
  } catch {
    // Abaikan error saat proses keluar jika sesi sudah tidak ada
  }

  redirect("/admin/login");
}

/**
 * Server Action untuk mengganti password admin yang sedang login.
 */
export async function gantiPassword(prevStateOrFormData, maybeFormData) {
  const formData = maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;
  const passwordBaru = (
    formData?.get?.("password_baru") ||
    formData?.get?.("password") ||
    ""
  ).toString();
  const konfirmasiPassword = (
    formData?.get?.("konfirmasi_password") ||
    formData?.get?.("konfirmasi") ||
    formData?.get?.("confirm_password") ||
    ""
  ).toString();

  if (!passwordBaru) {
    return { error: "Password baru wajib diisi." };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Password baru dan konfirmasi password harus sama." };
  }

  try {
    const supabase = await buatKoneksiAdmin();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Anda harus login terlebih dahulu untuk mengganti password." };
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: passwordBaru,
    });

    if (updateError) {
      return { error: updateError.message || "Gagal mengganti password." };
    }

    return { success: true, pesan: "Password berhasil diganti." };
  } catch (err) {
    return { error: err.message || "Terjadi kesalahan pada server saat mengganti password." };
  }
}


