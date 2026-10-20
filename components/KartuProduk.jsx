"use client";

import Link from "next/link";
import { useState } from "react";
import GambarProduk from "@/components/GambarProduk";
import { useKeranjang } from "@/components/TataLetakUtama";
import { formatRupiah } from "@/lib/format";

const warnaBadge = {
  Terlaris: "bg-utama",
  Baru: "bg-aksen",
  "Stok terbatas": "bg-bahaya",
};

function Stepper({ jumlah, ubah, nama }) {
  return (
    <div className="inline-flex h-10 shrink-0 items-center rounded-full border border-garis bg-white">
      <button type="button" onClick={() => ubah(Math.max(1, jumlah - 1))} aria-label={`Kurangi jumlah ${nama}`} className="grid h-full w-9 place-items-center rounded-l-full text-lg hover:bg-permukaan">−</button>
      <span className="min-w-5 text-center text-xs font-bold" aria-live="polite">{jumlah}</span>
      <button type="button" onClick={() => ubah(jumlah + 1)} aria-label={`Tambah jumlah ${nama}`} className="grid h-full w-9 place-items-center rounded-r-full text-lg hover:bg-permukaan">+</button>
    </div>
  );
}

export default function KartuProduk({ produk }) {
  const { tambah } = useKeranjang();
  const [jumlah, setJumlah] = useState(1);
  const [varian, setVarian] = useState(produk.varian?.opsi?.[0]?.nama ?? "");
  const opsiAktif = produk.varian?.opsi?.find((opsi) => opsi.nama === varian);
  const harga = produk.harga + (opsiAktif?.tambahan ?? 0);

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-white bg-white p-2.5 shadow-kartu transition duration-200 hover:-translate-y-0.5 hover:shadow-panel focus-within:shadow-panel motion-reduce:transform-none sm:p-3">
      <Link href={`/produk/${produk.id}`} aria-label={`Lihat detail ${produk.nama}`} className="relative block aspect-[4/3] overflow-hidden rounded-[15px] bg-permukaan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-utama">
        <GambarProduk produk={produk} className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.03] motion-reduce:transform-none" />
        {produk.badge ? (
          <span className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-bold text-white ${warnaBadge[produk.badge] ?? "bg-teks"}`}>
            {produk.badge}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col pt-3">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/produk/${produk.id}`} className="line-clamp-2 min-h-10 text-sm font-bold leading-snug hover:text-utama focus-visible:outline-2 focus-visible:outline-utama">
            {produk.nama}
          </Link>
          <span className="shrink-0 pt-0.5 text-right text-sm font-extrabold text-teks">{formatRupiah(harga)}</span>
        </div>
        <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-relaxed text-teks-lembut">{produk.deskripsi}</p>

        {produk.varian?.opsi?.length ? (
          <fieldset className="mt-2 min-w-0">
            <legend className="mb-1 text-[11px] font-semibold text-teks-lembut">{produk.varian.nama}</legend>
            <div className="flex flex-wrap gap-1.5">
              {produk.varian.opsi.map((opsi) => (
                <button key={opsi.nama} type="button" aria-pressed={varian === opsi.nama} onClick={() => setVarian(opsi.nama)} className={`min-h-8 rounded-full border px-2.5 text-[10px] font-semibold transition-colors ${varian === opsi.nama ? "border-aksen bg-peach text-aksen" : "border-garis text-teks-lembut hover:border-aksen"}`}>
                  {opsi.nama}
                </button>
              ))}
            </div>
          </fieldset>
        ) : (
          <p className="mt-2 min-h-8 text-[11px] font-medium text-teks-lembut">{produk.kategori}</p>
        )}

        <div className="mt-auto flex items-center gap-1.5 pt-3">
          <Stepper jumlah={jumlah} ubah={setJumlah} nama={produk.nama} />
          <button
            type="button"
            disabled={produk.tersedia === false}
            onClick={() => { tambah(produk, jumlah, varian || null); setJumlah(1); }}
            className="min-h-10 min-w-0 flex-1 rounded-full bg-karamel px-2 text-[11px] font-bold leading-tight text-white transition-colors duration-200 hover:bg-karamel-hover disabled:cursor-not-allowed disabled:bg-teks-lembut"
          >
            {produk.tersedia === false ? "Habis" : "Tambah ke Keranjang"}
          </button>
        </div>
      </div>
    </article>
  );
}
