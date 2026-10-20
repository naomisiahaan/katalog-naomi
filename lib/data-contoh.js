// DATA CONTOH: hanya untuk tampilan awal sebelum terhubung ke database.
// Kolom dasar sama dengan tabel "produk" di docs/schema.sql
// (id, nama, harga, deskripsi, foto_url, kategori, created_at).
// Field opsional (badge, varian, spesifikasi) tidak ada di database:
// kalau nilainya hilang saat US-01 selesai, tampilan tetap aman.
// Setelah US-01 selesai, halaman tidak lagi memakai file ini.

export const produkContoh = [
  {
    id: 1,
    nama: "Kopi Bubuk Robusta 250 g",
    harga: 45000,
    deskripsi:
      "Biji robusta disangrai sedang lalu digiling halus. Cocok untuk kopi tubruk dan kopi susu.",
    foto_url: null,
    kategori: "Minuman",
    created_at: "2026-10-12T09:00:00+07:00",
    badge: "Terlaris",
    varian: {
      nama: "Ukuran",
      opsi: [
        { nama: "250 g", tambahan: 0 },
        { nama: "500 g", tambahan: 35000 },
      ],
    },
    spesifikasi: [
      ["Isi bersih", "250 g"],
      ["Komposisi", "Biji kopi robusta 100%"],
      ["Asal", "Wonosobo, Jawa Tengah"],
      ["Cara menyajikan", "2 sdm per 150 ml air panas, seduh 3 menit"],
    ],
  },
  {
    id: 2,
    nama: "Keripik Singkong Balado",
    harga: 15000,
    deskripsi: "Singkong iris tipis, digoreng renyah, dibalut bumbu balado pedas manis.",
    foto_url: null,
    kategori: "Camilan",
    created_at: "2026-10-10T09:00:00+07:00",
    spesifikasi: [
      ["Isi bersih", "200 g"],
      ["Komposisi", "Singkong, minyak kelapa, cabai, bawang, gula, garam"],
      ["Daya tahan", "2 bulan sejak produksi"],
      ["Asal", "Garut, Jawa Barat"],
    ],
  },
  {
    id: 3,
    nama: "Sambal Bawang Botol 150 ml",
    harga: 25000,
    deskripsi: "Cabai rawit dan bawang putih goreng dengan minyak, tahan hingga 2 bulan.",
    foto_url: null,
    kategori: "Bumbu",
    created_at: "2026-10-08T09:00:00+07:00",
    varian: {
      nama: "Level pedas",
      opsi: [
        { nama: "Level 1 (sedang)", tambahan: 0 },
        { nama: "Level 3 (pedas)", tambahan: 3000 },
      ],
    },
    spesifikasi: [
      ["Isi bersih", "150 ml"],
      ["Komposisi", "Cabai rawit, bawang putih, minyak kelapa, garam"],
      ["Daya tahan", "2 bulan setelah dibuka, simpan di kulkas"],
      ["Asal", "Surabaya, Jawa Timur"],
    ],
  },
  {
    id: 4,
    nama: "Kue Nastar Toples 500 g",
    harga: 85000,
    deskripsi: "Nastar lembut dengan selai nanas buatan sendiri. Dikemas toples kedap udara.",
    foto_url: null,
    kategori: "Kue kering",
    created_at: "2026-10-05T09:00:00+07:00",
    spesifikasi: [
      ["Isi bersih", "500 g (kurang lebih 45 butir)"],
      ["Komposisi", "Tepung terigu, mentega, telur, selai nanas, gula halus"],
      ["Daya tahan", "1 bulan sejak produksi"],
      ["Asal", "Solo, Jawa Tengah"],
    ],
  },
  {
    id: 5,
    nama: "Tas Anyaman Pandan",
    harga: 120000,
    deskripsi: "Dianyam tangan dari daun pandan kering, dilapisi kain di bagian dalam.",
    foto_url: null,
    kategori: "Kerajinan",
    created_at: "2026-10-02T09:00:00+07:00",
    spesifikasi: [
      ["Ukuran", "28 x 22 x 12 cm"],
      ["Bahan", "Daun pandan kering, kain katun"],
      ["Perawatan", "Lap kering, jauhkan dari air"],
      ["Asal", "Pekalongan, Jawa Tengah"],
    ],
  },
  {
    id: 6,
    nama: "Kain Batik Cap 2 m",
    harga: 175000,
    deskripsi: "Batik cap motif parang di atas kain katun primisima, panjang 2 meter.",
    foto_url: null,
    kategori: "Kain",
    created_at: "2026-09-28T09:00:00+07:00",
    spesifikasi: [
      ["Ukuran", "2 meter x 115 cm"],
      ["Bahan", "Kain katun primisima"],
      ["Motif", "Parang cap"],
      ["Asal", "Pekalongan, Jawa Tengah"],
    ],
  },
  {
    id: 7,
    nama: "Teh Daun Kelor Celup",
    harga: 32000,
    deskripsi:
      "Daun kelor kering tanpa campuran, praktis untuk seduhan sehari-hari. Rasanya ringan dan sedikit hangat.",
    foto_url: null,
    kategori: "Minuman",
    created_at: "2026-10-17T09:00:00+07:00",
    badge: "Baru",
    spesifikasi: [
      ["Isi bersih", "20 kantong celup"],
      ["Komposisi", "Daun kelor kering 100%"],
      ["Daya tahan", "12 bulan sejak produksi"],
      ["Asal", "Sleman, DI Yogyakarta"],
    ],
  },
  {
    id: 8,
    nama: "Kopi Arabika Gayo 200 g",
    harga: 68000,
    deskripsi:
      "Arabika single origin dari dataran tinggi Gayo, disangrai medium. Aroma cokelat dan kayu manis.",
    foto_url: null,
    kategori: "Minuman",
    created_at: "2026-10-14T09:00:00+07:00",
    badge: "Terlaris",
    varian: {
      nama: "Bentuk",
      opsi: [
        { nama: "Biji utuh", tambahan: 0 },
        { nama: "Bubuk", tambahan: 0 },
      ],
    },
    spesifikasi: [
      ["Isi bersih", "200 g"],
      ["Komposisi", "Biji kopi arabika Gayo 100%"],
      ["Tingkat sangrai", "Medium"],
      ["Asal", "Takengon, Aceh"],
    ],
  },
  {
    id: 9,
    nama: "Jahe Merah Instan",
    harga: 28000,
    deskripsi:
      "Serbuk jahe merah asli dengan gula aren, tanpa pemanis buatan. Seduh dengan air panas atau dingin.",
    foto_url: null,
    kategori: "Minuman",
    created_at: "2026-10-09T09:00:00+07:00",
    spesifikasi: [
      ["Isi bersih", "250 g"],
      ["Komposisi", "Jahe merah, gula aren, serai"],
      ["Daya tahan", "12 bulan"],
      ["Asal", "Sidoarjo, Jawa Timur"],
    ],
  },
  {
    id: 10,
    nama: "Sirup Markisa Botol",
    harga: 42000,
    deskripsi:
      "Sirup markisa pekat dari buah segar Pasuruan. Encerkan 1 bagian sirup dengan 4 bagian air.",
    foto_url: null,
    kategori: "Minuman",
    created_at: "2026-10-15T09:00:00+07:00",
    badge: "Baru",
    varian: {
      nama: "Ukuran",
      opsi: [
        { nama: "Botol 300 ml", tambahan: 0 },
        { nama: "Botol 600 ml", tambahan: 20000 },
      ],
    },
    spesifikasi: [
      ["Isi bersih", "300 ml / 600 ml"],
      ["Komposisi", "Sari markisa, gula, air, asam sitrat"],
      ["Daya tahan", "6 bulan, simpan di kulkas setelah dibuka"],
      ["Asal", "Pasuruan, Jawa Timur"],
    ],
  },
  {
    id: 11,
    nama: "Keripik Tempe Original",
    harga: 18000,
    deskripsi:
      "Tempe kedelai diiris tipis dan digoreng renyah tanpa bumbu berat. Cocok untuk teman nasi.",
    foto_url: null,
    kategori: "Camilan",
    created_at: "2026-10-11T09:00:00+07:00",
    spesifikasi: [
      ["Isi bersih", "180 g"],
      ["Komposisi", "Tempe kedelai, minyak kelapa, garam"],
      ["Daya tahan", "2 bulan"],
      ["Asal", "Malang, Jawa Timur"],
    ],
  },
  {
    id: 12,
    nama: "Kacang Bawang Gurih",
    harga: 22000,
    deskripsi: "Kacang tanah pilihan digoreng dengan bawang putih hingga gurih dan renyah.",
    foto_url: null,
    kategori: "Camilan",
    created_at: "2026-10-06T09:00:00+07:00",
    spesifikasi: [
      ["Isi bersih", "250 g"],
      ["Komposisi", "Kacang tanah, bawang putih, garam, daun jeruk"],
      ["Daya tahan", "2 bulan"],
      ["Asal", "Bogor, Jawa Barat"],
    ],
  },
  {
    id: 13,
    nama: "Emping Melinjo",
    harga: 24000,
    deskripsi:
      "Emping melinjo asli dengan sedikit rasa pahit khas. Digoreng sendiri agar tetap renyah.",
    foto_url: null,
    kategori: "Camilan",
    created_at: "2026-09-30T09:00:00+07:00",
    badge: "Stok terbatas",
    spesifikasi: [
      ["Isi bersih", "250 g (mentah, siap goreng)"],
      ["Komposisi", "Biji melinjo, sagu, garam"],
      ["Daya tahan", "6 bulan"],
      ["Asal", "Bogor, Jawa Barat"],
    ],
  },
  {
    id: 14,
    nama: "Sambal Terasi Matah",
    harga: 30000,
    deskripsi:
      "Sambal mentah khas Bali: cabai, bawang, serai, dan terasi bakar, disiram minyak kelapa panas.",
    foto_url: null,
    kategori: "Bumbu",
    created_at: "2026-10-13T09:00:00+07:00",
    spesifikasi: [
      ["Isi bersih", "150 g"],
      ["Komposisi", "Cabai rawit, bawang merah, serai, daun jeruk, terasi udang"],
      ["Daya tahan", "1 bulan di kulkas"],
      ["Asal", "Gianyar, Bali"],
    ],
  },
  {
    id: 15,
    nama: "Bumbu Rendang Instan",
    harga: 35000,
    deskripsi:
      "Bumbu rendang lengkap dengan santan kering. Satu bungkus cukup untuk 1 kg daging, tinggal masak.",
    foto_url: null,
    kategori: "Bumbu",
    created_at: "2026-10-16T09:00:00+07:00",
    badge: "Terlaris",
    spesifikasi: [
      ["Isi bersih", "200 g (untuk 1 kg daging)"],
      ["Komposisi", "Cabai, bawang, lengkuas, serai, santan bubuk, rempah"],
      ["Daya tahan", "6 bulan"],
      ["Asal", "Payakumbuh, Sumatera Barat"],
    ],
  },
  {
    id: 16,
    nama: "Kue Kastengel Keju",
    harga: 95000,
    deskripsi:
      "Kastengel lumer keju edam di setiap gigitan, dipanggang harum. Pas untuk teman kopi dan lebaran.",
    foto_url: null,
    kategori: "Kue kering",
    created_at: "2026-10-07T09:00:00+07:00",
    spesifikasi: [
      ["Isi bersih", "450 g"],
      ["Komposisi", "Tepung terigu, mentega, keju edam, telur"],
      ["Daya tahan", "1 bulan sejak produksi"],
      ["Asal", "Bandung, Jawa Barat"],
    ],
  },
  {
    id: 17,
    nama: "Dodol Durian",
    harga: 45000,
    deskripsi:
      "Dodol durian legit dengan aroma buah asli dari Lubuklinggau. Lembut dan tidak lengket di gigi.",
    foto_url: null,
    kategori: "Kue kering",
    created_at: "2026-10-01T09:00:00+07:00",
    spesifikasi: [
      ["Isi bersih", "400 g"],
      ["Komposisi", "Durian, santan, gula, tepung ketan"],
      ["Daya tahan", "2 bulan"],
      ["Asal", "Lubuklinggau, Sumatera Selatan"],
    ],
  },
  {
    id: 18,
    nama: "Topi Anyaman Rotan",
    harga: 75000,
    deskripsi:
      "Topi pantai anyaman rotan alami dengan pinggang lebar, ringan dan adem dipakai seharian.",
    foto_url: null,
    kategori: "Kerajinan",
    created_at: "2026-10-03T09:00:00+07:00",
    spesifikasi: [
      ["Ukuran", "Lingkar kepala 56-58 cm"],
      ["Bahan", "Rotan alami"],
      ["Perawatan", "Keringkan di angin, jauhkan dari air"],
      ["Asal", "Cirebon, Jawa Barat"],
    ],
  },
  {
    id: 19,
    nama: "Dompet Tenun Ikat",
    harga: 65000,
    deskripsi:
      "Dompet kecil bertenun tangan dengan motif ikat khas NTT, dilapisi kain dan resleting kuat.",
    foto_url: null,
    kategori: "Kerajinan",
    created_at: "2026-09-29T09:00:00+07:00",
    spesifikasi: [
      ["Ukuran", "19 x 10 cm"],
      ["Bahan", "Kain tenun ikat, lapisan kain, resleting"],
      ["Perawatan", "Cuci kering, jangan diperas"],
      ["Asal", "Kupang, Nusa Tenggara Timur"],
    ],
  },
  {
    id: 20,
    nama: "Selendang Songket Palembang",
    harga: 210000,
    deskripsi:
      "Songket tenun tangan dengan sulaman benang emas, motif bungo pacik. Elegan untuk acara keluarga.",
    foto_url: null,
    kategori: "Kain",
    created_at: "2026-09-26T09:00:00+07:00",
    badge: "Stok terbatas",
    spesifikasi: [
      ["Ukuran", "200 x 55 cm"],
      ["Bahan", "Kain sutra katun, benang emas"],
      ["Perawatan", "Dry clean, simpan digulung"],
      ["Asal", "Palembang, Sumatera Selatan"],
    ],
  },
].map((produk, index) => ({
  ...produk,
  tersedia: produk.tersedia ?? true,
  terjual: produk.terjual ?? Math.max(8, 180 - index * 7),
  tanggalDitambahkan: produk.tanggalDitambahkan ?? produk.created_at,
}));

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}

// Produk terkait: utamakan kategori sama, kalau kurang isi dengan kategori lain.
export function produkTerkaitContoh(produk, jumlah = 4) {
  const sejenis = produkContoh.filter(
    (p) => p.id !== produk.id && p.kategori === produk.kategori
  );
  const lain = produkContoh.filter(
    (p) => p.id !== produk.id && p.kategori !== produk.kategori
  );
  return [...sejenis, ...lain].slice(0, jumlah);
}
