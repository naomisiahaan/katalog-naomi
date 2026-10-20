import { IkonWhatsApp } from "@/components/Ikon";
import { buatPesanPemesanan, linkWhatsApp } from "@/lib/toko";

// US-03: tombol membuka WhatsApp toko dengan pesan otomatis berisi nama, jumlah, dan total.
export default function TombolWhatsApp({ produk, jumlah = 1, varian = null, className = "" }) {
  const namaPesan = varian ? `${produk.nama} (${varian})` : produk.nama;
  const total = (produk.harga + (produk.tambahanHarga || 0)) * jumlah;
  const pesan = buatPesanPemesanan({ namaProduk: namaPesan, jumlah, total });
  const href = linkWhatsApp(pesan);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-utama px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-utama-gelap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-utama sm:w-auto ${className}`}
    >
      <IkonWhatsApp className="h-5 w-5" />
      Pesan via WhatsApp
    </a>
  );
}
