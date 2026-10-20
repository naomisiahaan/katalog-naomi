import { formatRupiah } from "./format";

// Identitas toko. SEMUA nama toko di website dibaca dari file ini.
// Ganti dengan data usahamu (lihat lembar kustomisasi).
export const toko = {
  nama: "Naomi's Store",
  namaPendek: "Naomi's",
  tagline: "Produk rumahan dari dapur dan perajin lokal, siap dipesan lewat WhatsApp.",
  // Format internasional tanpa tanda + dan tanpa angka 0 di depan. Contoh: 6281234567890
  nomorWhatsApp: "6281234567890",
  alamat: "Jl. Contoh No. 1, Kota Anda",
  jamBuka: "Setiap hari, 08.00–20.00",
};

// Tautan media sosial. Ganti dengan akunmu sendiri (url contoh, mudah diganti).
export const sosial = [
  { nama: "Instagram", url: "https://instagram.com/contoh" },
  { nama: "TikTok", url: "https://tiktok.com/@contoh" },
  { nama: "Facebook", url: "https://facebook.com/contoh" },
];

// Judul dan deskripsi SEO, dibangun dari nama toko supaya tidak ada nama yang tertinggal.
export const judulBeranda = `${toko.nama} | Produk Rumahan dan Kerajinan Lokal`;
export const deskripsiMeta = `${toko.nama} — ${toko.tagline}`;

// Nama toko terbagi dua bagian untuk tampilan header: "Naomi's" (tebal) + "Store" (aksen).
export const namaTokoTerbagi = {
  awal: toko.namaPendek,
  akhir: toko.nama.slice(toko.namaPendek.length).trim(),
};

// Template pesan pemesanan WhatsApp. Ubah kalimatnya di sini.
export function buatPesanPemesanan({ namaProduk, jumlah = 1, total }) {
  return `Halo ${toko.nama}, saya ingin memesan: ${namaProduk} x${jumlah}. Total: ${formatRupiah(total)}. Terima kasih!`;
}

export function buatPesanKeranjang({ items, metode, total }) {
  const rincian = items
    .map((item) => {
      const varian = item.varian ? ` (${item.varian})` : "";
      return `- ${item.nama}${varian} x${item.jumlah}: ${formatRupiah(item.harga * item.jumlah)}`;
    })
    .join("\n");

  return `Halo ${toko.nama}, saya ingin memesan:\n${rincian}\n\nMetode: ${metode}\nTotal: ${formatRupiah(total)}\nTerima kasih!`;
}

// Susun link wa.me dari pesan (sudah di-encode).
export function linkWhatsApp(pesan) {
  return `https://wa.me/${toko.nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
}

// Pesan umum untuk tombol WhatsApp di header/footer (belum memilih produk).
export function buatPesanTanya() {
  return `Halo ${toko.nama}, saya ingin bertanya tentang produknya.`;
}
