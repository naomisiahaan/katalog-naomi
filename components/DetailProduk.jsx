"use client";

import Link from "next/link";
import { useState } from "react";
import GambarProduk from "@/components/GambarProduk";
import KartuProduk from "@/components/KartuProduk";
import TombolWhatsApp from "@/components/TombolWhatsApp";
import { useKeranjang } from "@/components/TataLetakUtama";
import { formatRupiah } from "@/lib/format";

export default function DetailProduk({ produk, produkTerkait }) {
  const { tambah } = useKeranjang();
  const [jumlah, setJumlah] = useState(1);
  const [varian, setVarian] = useState(produk.varian?.opsi?.[0]?.nama ?? "");
  const [gambarAktif, setGambarAktif] = useState(0);
  const opsi = produk.varian?.opsi?.find((item) => item.nama === varian);
  const tambahan = opsi?.tambahan ?? 0;
  const harga = produk.harga + tambahan;
  const itemUntukPesan = { ...produk, tambahanHarga: tambahan };

  return (
    <div className="py-3 sm:py-5">
      <nav aria-label="Breadcrumb" className="mb-5 text-xs text-teks-lembut">
        <Link href="/" className="underline underline-offset-4 hover:text-utama">Menu Produk</Link>
        <span aria-hidden="true" className="px-2">/</span>
        <span aria-current="page" className="font-semibold text-teks">{produk.nama}</span>
      </nav>

      <article className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-8">
        <div>
          <div className="aspect-square overflow-hidden rounded-[24px] border border-white bg-white p-2 shadow-kartu sm:rounded-[28px]">
            <div className="h-full overflow-hidden rounded-[19px] bg-permukaan">
              <GambarProduk produk={produk} varian={gambarAktif} prioritas className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3" aria-label="Galeri foto produk">
            {[0, 1, 2, 3].map((indeks) => (
              <button key={indeks} type="button" onClick={() => setGambarAktif(indeks)} aria-label={`Tampilkan foto produk ${indeks + 1}`} aria-pressed={gambarAktif === indeks} className={`aspect-square overflow-hidden rounded-2xl border-2 bg-white p-1 ${gambarAktif === indeks ? "border-utama" : "border-transparent"}`}>
                <GambarProduk produk={produk} varian={indeks} className="h-full w-full rounded-xl object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold text-utama">{produk.kategori}</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{produk.nama}</h1>
          {produk.badge ? <span className="mt-3 self-start rounded-full bg-peach px-3 py-1 text-xs font-bold text-aksen">{produk.badge}</span> : null}
          <p className="mt-4 text-2xl font-extrabold text-harga">{formatRupiah(harga)}</p>
          <p className="mt-4 leading-relaxed text-teks-lembut">{produk.deskripsi}</p>

          {produk.varian?.opsi?.length ? (
            <fieldset className="mt-6">
              <legend className="mb-2 text-sm font-bold">{produk.varian.nama}</legend>
              <div className="flex flex-wrap gap-2">
                {produk.varian.opsi.map((pilihan) => (
                  <button key={pilihan.nama} type="button" aria-pressed={varian === pilihan.nama} onClick={() => setVarian(pilihan.nama)} className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${varian === pilihan.nama ? "border-aksen bg-peach text-aksen" : "border-garis bg-white text-teks-lembut hover:border-aksen"}`}>
                    {pilihan.nama}{pilihan.tambahan ? ` (+${formatRupiah(pilihan.tambahan)})` : ""}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          <div className="mt-6">
            <p className="mb-2 text-sm font-bold">Jumlah</p>
            <div className="inline-flex h-12 items-center rounded-full border border-garis bg-white">
              <button type="button" onClick={() => setJumlah(Math.max(1, jumlah - 1))} aria-label={`Kurangi jumlah ${produk.nama}`} className="grid h-full w-12 place-items-center rounded-l-full text-xl hover:bg-permukaan">−</button>
              <span className="min-w-8 text-center font-bold" aria-live="polite">{jumlah}</span>
              <button type="button" onClick={() => setJumlah(jumlah + 1)} aria-label={`Tambah jumlah ${produk.nama}`} className="grid h-full w-12 place-items-center rounded-r-full text-xl hover:bg-permukaan">+</button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" disabled={produk.tersedia === false} onClick={() => tambah(produk, jumlah, varian || null)} className="min-h-12 flex-1 rounded-full bg-karamel px-5 text-sm font-bold text-white transition-colors hover:bg-karamel-hover disabled:bg-teks-lembut">
              Tambah ke Keranjang
            </button>
            <TombolWhatsApp produk={itemUntukPesan} jumlah={jumlah} varian={varian || null} />
          </div>
          {produk.tersedia === false ? <p className="mt-2 text-sm font-semibold text-bahaya">Produk sedang tidak tersedia.</p> : null}

          {produk.spesifikasi?.length ? (
            <section aria-labelledby="judul-spesifikasi" className="mt-8 border-t border-garis pt-5">
              <h2 id="judul-spesifikasi" className="text-lg font-extrabold">Spesifikasi produk</h2>
              <dl className="mt-3 divide-y divide-garis rounded-2xl border border-garis bg-white px-4">
                {produk.spesifikasi.map(([label, nilai]) => (
                  <div key={label} className="grid grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] gap-3 py-3 text-sm">
                    <dt className="text-teks-lembut">{label}</dt><dd className="font-semibold">{nilai}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
        </div>
      </article>

      {produkTerkait.length ? (
        <section aria-labelledby="judul-produk-terkait" className="mt-10 border-t border-garis pt-7">
          <h2 id="judul-produk-terkait" className="text-2xl font-extrabold">Produk terkait</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
            {produkTerkait.map((item) => <KartuProduk key={item.id} produk={item} />)}
          </div>
        </section>
      ) : null}
      <p className="mt-6 inline-flex rounded-full border border-dashed border-garis bg-white/70 px-3 py-1 text-[10px] text-teks-lembut">Data contoh — akan diganti dari database (US-02).</p>
    </div>
  );
}
