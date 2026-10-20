# Panduan Tampilan

Ikuti panduan ini setiap kali membuat atau mengubah tampilan, supaya semua halaman terlihat konsisten. Untuk menyesuaikan dengan usahamu, ganti nilai warna di `app/globals.css` (bagian `@theme`) dan isi `lib/toko.js`.

## Warna

| Token | Nilai awal | Dipakai untuk |
| --- | --- | --- |
| `latar` | `#fffaf5` | Latar kartu dan halaman admin |
| `permukaan` | `#f8eee4` | Latar bagian sekunder |
| `garis` | `#e8d8ca` | Garis tepi dan pemisah |
| `teks` | `#34271f` | Teks utama |
| `teks-lembut` | `#65564b` | Teks pendukung: kategori, keterangan |
| `utama` | `#1f6b4f` | Tombol utama, tautan aktif, nama toko |
| `utama-gelap` | `#154d39` | Tombol utama saat disorot |
| `aksen` / `aksen-hover` | `#a94308` / `#873506` | Filter dan kategori aktif |
| `karamel` / `karamel-hover` | `#805333` / `#684128` | Tombol tambah ke keranjang |
| `peach` | `#f8e2d2` | Latar aktif dan aksen lembut |
| `panel` | `#fffdf9` | Panel katalog dan keranjang |
| `harga` / `harga-latar` | `#7a4e09` / `#fbefd8` | Label harga |
| `emas` | `#a16207` | Aksen hangat: nama toko di header, titik logo |
| `bahaya` | `#b42318` | Aksi hapus dan pesan error |

Pakai sebagai kelas Tailwind, misalnya `bg-utama`, `text-teks-lembut`, `border-garis`. Jangan menulis kode warna langsung di kelas.
Warna teks dan tombol menggunakan pasangan kontras tinggi untuk keterbacaan; jaga rasio WCAG AA ketika mengganti token.

## Huruf

- Satu jenis huruf: Plus Jakarta Sans.
- Judul halaman: `text-2xl` sampai `text-5xl`, `font-extrabold`.
- Teks biasa: ukuran bawaan, panjang baris maksimal sekitar 70 karakter (`max-w-prose`).
- Tulisan memakai huruf kecil biasa (sentence case), bukan HURUF BESAR semua.

## Komponen

Gunakan komponen yang sudah ada sebelum membuat yang baru:

| Komponen | Fungsi |
| --- | --- |
| `Tombol` | Tombol dan tautan berbentuk tombol (varian `utama`, `garis`, `bahaya`) |
| `Input` | Kolom isian beserta label, termasuk textarea |
| `Logo` | Logo toko (SVG huruf N), diganti dengan logo asli lewat file ini saja |
| `KartuProduk` | Kartu di katalog |
| `TabelProduk` | Daftar produk di halaman admin |
| `FormProduk` | Form tambah dan ubah produk |
| `NavAdmin` | Menu di halaman admin |

## Tata letak

- Halaman publik memakai panel katalog krem dengan navigasi samping dan ringkasan keranjang.
- Navigasi penuh tampil pada layar lebar, menyempit menjadi ikon pada tablet, dan berubah menjadi drawer serta navigasi bawah pada ponsel.
- Katalog memakai 2 kolom pada ponsel/tablet dan 3 kolom pada layar lebar.
- Gunakan radius besar, bayangan lembut, dan hindari scroll horizontal halaman.
- Selalu cek tampilan pada lebar 360, 768, 1024, dan 1440 px.

## Bahasa

- Gunakan bahasa Indonesia yang singkat dan jelas.
- Label tombol menyebut aksinya: "Simpan produk", bukan "Submit".
- Pesan error menjelaskan apa yang salah dan cara memperbaikinya.
