import KatalogProduk from "@/components/KatalogProduk";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog() {
  let daftarProduk = null;
  let pesanError = null;

  try {
    const supabase = buatKoneksiServer();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      pesanError = error.message;
    } else {
      daftarProduk = data;
    }
  } catch (err) {
    pesanError = err.message || "Terjadi kesalahan saat menghubungi database.";
  }

  if (pesanError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="max-w-md rounded-2xl border border-bahaya/30 bg-bahaya/10 p-6 text-bahaya">
          <p className="text-base font-bold">Gagal memuat produk</p>
          <p className="mt-2 text-sm">{pesanError}</p>
        </div>
      </div>
    );
  }

  if (!daftarProduk || daftarProduk.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-[20px] border border-dashed border-garis bg-white px-8 py-14 text-center shadow-kartu">
          <p className="text-lg font-bold text-teks">Belum ada produk</p>
          <p className="mt-1 text-sm text-teks-lembut">
            Produk toko akan segera ditampilkan di sini.
          </p>
        </div>
      </div>
    );
  }

  return <KatalogProduk daftarProduk={daftarProduk} />;
}
