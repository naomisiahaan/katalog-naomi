import { notFound } from "next/navigation";
import DetailProduk from "@/components/DetailProduk";
import { cariProdukContoh, produkTerkaitContoh } from "@/lib/data-contoh";

// US-02: halaman ini masih memakai data contoh sebelum terhubung ke database.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const produk = cariProdukContoh(id);
  return produk ? { title: produk.nama } : { title: "Produk tidak ditemukan" };
}

export default async function HalamanDetailProduk({ params }) {
  const { id } = await params;
  const produk = cariProdukContoh(id);
  if (!produk) notFound();

  return <DetailProduk produk={produk} produkTerkait={produkTerkaitContoh(produk, 4)} />;
}
