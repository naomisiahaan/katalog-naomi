import Tombol from "@/components/Tombol";
import { toko } from "@/lib/toko";

export default function TidakDitemukan() {
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <h1 className="text-2xl font-extrabold">Halaman tidak ditemukan</h1>
      <p className="text-teks-lembut">
        Produk atau halaman di {toko.nama} yang kamu cari tidak ada atau sudah dihapus.
      </p>
      <Tombol href="/">Lihat semua produk</Tombol>
    </div>
  );
}
