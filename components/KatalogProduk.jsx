"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import KartuProduk from "@/components/KartuProduk";
import { IkonCari } from "@/components/Ikon";

const kategori = ["Semua", "Minuman", "Camilan", "Bumbu", "Kue Kering", "Kerajinan", "Kain"];
const opsiUrut = [
  { nilai: "terbaru", label: "Terbaru" },
  { nilai: "terlaris", label: "Terlaris" },
  { nilai: "harga-asc", label: "Harga terendah" },
  { nilai: "harga-desc", label: "Harga tertinggi" },
  { nilai: "nama", label: "Nama A–Z" },
];

const slugKategori = (nilai) => nilai.toLocaleLowerCase("id-ID").replaceAll(" ", "-");
const cocokKategori = (produk, pilihan) =>
  pilihan === "Semua" || (produk.kategori ?? "").toLocaleLowerCase("id-ID") === pilihan.toLocaleLowerCase("id-ID");

function bacaURL() {
  const parameter = new URLSearchParams(window.location.search);
  const slug = parameter.get("kategori");
  return {
    kueri: parameter.get("q") ?? "",
    kategori: kategori.find((item) => slugKategori(item) === slug) ?? "Semua",
    urut: opsiUrut.some((opsi) => opsi.nilai === parameter.get("urut")) ? parameter.get("urut") : "terbaru",
    min: parameter.get("min") ?? "",
    max: parameter.get("max") ?? "",
    tersedia: parameter.get("tersedia") === "1",
  };
}

function waktuBuat(produk) {
  const timestamp = Date.parse(produk.tanggalDitambahkan ?? produk.created_at ?? "");
  return Number.isNaN(timestamp) ? Number(produk.id) || 0 : timestamp;
}

function urutkan(daftar, urut) {
  const salinan = [...daftar];
  switch (urut) {
    case "terlaris":
      return salinan.sort((a, b) => (b.terjual ?? 0) - (a.terjual ?? 0));
    case "harga-asc":
      return salinan.sort((a, b) => a.harga - b.harga);
    case "harga-desc":
      return salinan.sort((a, b) => b.harga - a.harga);
    case "nama":
      return salinan.sort((a, b) => a.nama.localeCompare(b.nama, "id"));
    default:
      return salinan.sort((a, b) => waktuBuat(b) - waktuBuat(a));
  }
}

function IkonFilter() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M7 12h10m-7 6h4" /></svg>;
}

export default function KatalogProduk({ daftarProduk }) {
  const inputCari = useRef(null);
  const [state, setState] = useState({
    kueri: "",
    kategori: "Semua",
    urut: "terbaru",
    min: "",
    max: "",
    tersedia: false,
  });
  const [siap, setSiap] = useState(false);
  const [filterTerbuka, setFilterTerbuka] = useState(false);

  useEffect(() => {
    setState(bacaURL());
    setSiap(true);
    const sinkronkanRiwayat = () => setState(bacaURL());
    window.addEventListener("popstate", sinkronkanRiwayat);
    return () => window.removeEventListener("popstate", sinkronkanRiwayat);
  }, []);

  useEffect(() => {
    if (!siap) return undefined;
    const timeout = window.setTimeout(() => {
      const parameter = new URLSearchParams();
      if (state.kategori !== "Semua") parameter.set("kategori", slugKategori(state.kategori));
      if (state.kueri.trim()) parameter.set("q", state.kueri.trim());
      if (state.urut !== "terbaru") parameter.set("urut", state.urut);
      if (state.min !== "") parameter.set("min", state.min);
      if (state.max !== "") parameter.set("max", state.max);
      if (state.tersedia) parameter.set("tersedia", "1");
      const query = parameter.toString();
      const url = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
      if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== url) {
        window.history.pushState({}, "", url);
      }
    }, state.kueri ? 200 : 0);
    return () => window.clearTimeout(timeout);
  }, [siap, state]);

  useEffect(() => {
    const pintasan = (event) => {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
      event.preventDefault();
      inputCari.current?.focus();
    };
    window.addEventListener("keydown", pintasan);
    return () => window.removeEventListener("keydown", pintasan);
  }, []);

  useEffect(() => {
    if (!filterTerbuka) return undefined;
    const tutupDenganEsc = (event) => { if (event.key === "Escape") setFilterTerbuka(false); };
    window.addEventListener("keydown", tutupDenganEsc);
    return () => window.removeEventListener("keydown", tutupDenganEsc);
  }, [filterTerbuka]);

  const hasil = useMemo(() => {
    const kata = state.kueri.trim().toLocaleLowerCase("id-ID");
    const hargaMin = state.min === "" ? 0 : Number(state.min);
    const hargaMaks = state.max === "" ? Infinity : Number(state.max);
    const tersaring = daftarProduk.filter((produk) => {
      const isi = `${produk.nama} ${produk.deskripsi ?? ""} ${produk.kategori ?? ""}`.toLocaleLowerCase("id-ID");
      return (
        cocokKategori(produk, state.kategori) &&
        (!kata || isi.includes(kata)) &&
        produk.harga >= hargaMin &&
        produk.harga <= hargaMaks &&
        (!state.tersedia || produk.tersedia !== false)
      );
    });
    return urutkan(tersaring, state.urut);
  }, [daftarProduk, state]);

  const jumlahFilterAktif = Number(state.min !== "") + Number(state.max !== "") + Number(state.tersedia);
  const ubahState = useCallback((field, value) => setState((sebelumnya) => ({ ...sebelumnya, [field]: value })), []);

  function resetFilter() {
    setState({ kueri: "", kategori: "Semua", urut: "terbaru", min: "", max: "", tersedia: false });
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <label htmlFor="cari-produk" className="sr-only">Cari produk</label>
            <IkonCari className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teks-lembut" />
            <input
              ref={inputCari}
              id="cari-produk"
              type="search"
              value={state.kueri}
              onChange={(event) => ubahState("kueri", event.target.value)}
              placeholder="Cari produk..."
              aria-label="Cari produk"
              className="h-12 w-full rounded-full border border-garis bg-white pl-12 pr-11 text-sm placeholder:text-teks-lembut focus:border-utama focus:outline-none"
            />
            {state.kueri ? <button type="button" onClick={() => ubahState("kueri", "")} aria-label="Hapus pencarian" className="absolute right-1 top-1 grid h-10 w-10 place-items-center rounded-full text-lg text-teks-lembut hover:bg-permukaan">×</button> : null}
          </div>
          <button
            type="button"
            onClick={() => setFilterTerbuka(true)}
            aria-haspopup="dialog"
            aria-expanded={filterTerbuka}
            className="relative inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-aksen px-4 text-sm font-bold text-white transition-colors hover:bg-aksen-hover"
          >
            <IkonFilter />Filter
            {jumlahFilterAktif > 0 ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[10px] font-extrabold text-aksen">{jumlahFilterAktif}</span> : null}
          </button>
        </div>

        <section id="produk" aria-labelledby="judul-produk" className="scroll-mt-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h1 id="judul-produk" className="text-3xl font-extrabold tracking-tight sm:text-4xl">Menu Produk</h1>
            <label htmlFor="urut-produk" className="flex min-h-10 items-center gap-2 text-xs font-semibold text-teks-lembut">
              Urutkan
              <select id="urut-produk" value={state.urut} onChange={(event) => ubahState("urut", event.target.value)} className="min-h-10 max-w-44 rounded-full border border-garis bg-white px-3 text-xs font-semibold text-teks focus:border-utama focus:outline-none">
                {opsiUrut.map((opsi) => <option key={opsi.nilai} value={opsi.nilai}>{opsi.label}</option>)}
              </select>
            </label>
          </div>

          <div className="category-scroll relative -mx-4 mt-5 flex overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 min-[1440px]:-mx-8 min-[1440px]:px-8">
            <div className="relative z-0 flex w-max shrink-0 gap-2">
              {kategori.map((item) => {
                const aktif = item === state.kategori;
                return (
                  <button key={item} type="button" onClick={() => ubahState("kategori", item)} aria-pressed={aktif} className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-semibold transition-colors duration-200 ${aktif ? "border-aksen bg-aksen text-white" : "border-garis bg-white text-teks-lembut hover:border-aksen hover:text-aksen"}`}>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex min-h-8 items-center justify-between gap-3">
            <p className="text-xs text-teks-lembut" aria-live="polite" aria-atomic="true">Menampilkan {hasil.length} dari {daftarProduk.length} produk</p>
          </div>

          {hasil.length === 0 ? (
            <div className="mt-4 flex flex-col items-center gap-3 rounded-[20px] border border-dashed border-garis bg-white px-6 py-14 text-center">
              <span className="text-4xl" aria-hidden="true">🍃</span>
              <p className="font-bold">Produk tidak ditemukan</p>
              <p className="max-w-sm text-sm text-teks-lembut">Coba kata kunci atau filter lain untuk melihat produk Naomi's Store.</p>
              <button type="button" onClick={resetFilter} className="min-h-11 rounded-full bg-utama px-5 text-sm font-bold text-white hover:bg-utama-gelap">Reset filter</button>
            </div>
          ) : (
            <div className="mt-2 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3 2xl:grid-cols-3 min-[1720px]:grid-cols-4">
              {hasil.map((produk) => <KartuProduk key={produk.id} produk={produk} />)}
            </div>
          )}

          <p className="mt-5 inline-flex rounded-full border border-dashed border-garis bg-white/70 px-3 py-1 text-[10px] text-teks-lembut">
            Data contoh — akan diganti dari database (US-01).
          </p>
        </section>
      </div>

      {filterTerbuka ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-teks/40 sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setFilterTerbuka(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="judul-filter" className="w-full max-w-md rounded-t-3xl bg-panel p-6 shadow-panel sm:rounded-3xl">
            <div className="flex items-center justify-between">
              <h2 id="judul-filter" className="text-xl font-extrabold">Filter produk</h2>
              <button type="button" onClick={() => setFilterTerbuka(false)} aria-label="Tutup filter" className="grid h-11 w-11 place-items-center rounded-full text-2xl hover:bg-permukaan">×</button>
            </div>
            <fieldset className="mt-5">
              <legend className="mb-2 text-sm font-bold">Rentang harga</legend>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs font-medium text-teks-lembut">Minimum (Rp)<input type="number" min="0" inputMode="numeric" value={state.min} onChange={(event) => ubahState("min", event.target.value)} placeholder="0" className="mt-1 min-h-11 w-full rounded-xl border border-garis bg-white px-3 text-sm text-teks focus:border-utama focus:outline-none" /></label>
                <label className="text-xs font-medium text-teks-lembut">Maksimum (Rp)<input type="number" min="0" inputMode="numeric" value={state.max} onChange={(event) => ubahState("max", event.target.value)} placeholder="Tanpa batas" className="mt-1 min-h-11 w-full rounded-xl border border-garis bg-white px-3 text-sm text-teks focus:border-utama focus:outline-none" /></label>
              </div>
            </fieldset>
            <label className="mt-5 flex min-h-12 items-center justify-between gap-3 rounded-xl border border-garis bg-white px-4 text-sm font-semibold">
              Hanya yang tersedia
              <input type="checkbox" checked={state.tersedia} onChange={(event) => ubahState("tersedia", event.target.checked)} className="h-5 w-5 accent-utama" />
            </label>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={resetFilter} className="min-h-12 flex-1 rounded-full border border-garis bg-white text-sm font-bold hover:bg-permukaan">Reset</button>
              <button type="button" onClick={() => setFilterTerbuka(false)} className="min-h-12 flex-1 rounded-full bg-aksen text-sm font-bold text-white hover:bg-aksen-hover">Tampilkan {hasil.length} produk</button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
