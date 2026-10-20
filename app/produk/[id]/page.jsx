import { notFound } from "next/navigation";
import DetailProduk from "@/components/DetailProduk";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function ambilProduk(id) {
  try {
    const supabase = buatKoneksiServer();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

async function ambilProdukTerkait(kategori, id) {
  try {
    const supabase = buatKoneksiServer();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .eq("kategori", kategori)
      .neq("id", id)
      .limit(4);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const produk = await ambilProduk(id);
  return produk ? { title: produk.nama } : { title: "Produk tidak ditemukan" };
}

export default async function HalamanDetailProduk({ params }) {
  const { id } = await params;
  const produk = await ambilProduk(id);
  if (!produk) notFound();

  const produkTerkait = await ambilProdukTerkait(produk.kategori, produk.id);

  return <DetailProduk produk={produk} produkTerkait={produkTerkait} />;
}
