import KatalogProduk from "@/components/KatalogProduk";
import { produkContoh } from "@/lib/data-contoh";

// US-01: halaman ini masih memakai data contoh.
// Tugas peserta: ambil daftar produk dari tabel "produk" di Supabase, di sisi server,
// lalu teruskan ke <KatalogProduk> lewat prop daftarProduk (filter dan pencarian tetap jalan).
export default function HalamanKatalog() {
  return <KatalogProduk daftarProduk={produkContoh} />;
}
