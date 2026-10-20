"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import GambarProduk from "@/components/GambarProduk";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import { IkonWhatsApp } from "@/components/Ikon";
import { formatRupiah } from "@/lib/format";
import { buatPesanKeranjang, buatPesanTanya, linkWhatsApp, toko } from "@/lib/toko";

const KUNCI_KERANJANG = "naomis-store-keranjang";
const KeranjangContext = createContext(null);

export function useKeranjang() {
  const context = useContext(KeranjangContext);
  if (!context) throw new Error("useKeranjang harus digunakan di dalam TataLetakUtama.");
  return context;
}

function IkonNavigasi({ nama, className = "h-5 w-5" }) {
  const atribut = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const gambar = {
    Beranda: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" {...atribut} /></>,
    "Menu Produk": <><rect x="4" y="3" width="16" height="18" rx="2" {...atribut} /><path d="M8 8h8M8 12h8M8 16h5" {...atribut} /></>,
    "Pesanan Saya": <><path d="M3 4h2l2.2 11h10.9l2-8H6" {...atribut} /><circle cx="9" cy="19" r="1.5" {...atribut} /><circle cx="17" cy="19" r="1.5" {...atribut} /></>,
    Riwayat: <><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" {...atribut} /><path d="M3 3v5h5m4-1v5l3 2" {...atribut} /></>,
    "Mitra/Perajin": <><circle cx="9" cy="8" r="3" {...atribut} /><path d="M3 20v-1a6 6 0 0 1 12 0v1zm13-9a3 3 0 1 0 0-6m1 9a5 5 0 0 1 4 5" {...atribut} /></>,
    Pengaturan: <><circle cx="12" cy="12" r="3" {...atribut} /><path d="m19.4 15 .1.1 1.1 1.8-1.7 2.9-2.1-.5a7.6 7.6 0 0 1-1.7 1l-.8 2.1h-3.4l-.8-2.1a7.6 7.6 0 0 1-1.7-1l-2.1.5-1.7-2.9L5.7 15a7.6 7.6 0 0 1 0-2l-1.1-1.8 1.7-2.9 2.1.5a7.6 7.6 0 0 1 1.7-1l.8-2.1h3.4l.8 2.1a7.6 7.6 0 0 1 1.7 1l2.1-.5 1.7 2.9-1.1 1.8a7.6 7.6 0 0 1-.1 2z" {...atribut} /></>,
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {gambar[nama]}
    </svg>
  );
}

function buatDataKeranjang(produk, jumlah, varian) {
  const opsi = varian ? produk.varian?.opsi?.find((pilihan) => pilihan.nama === varian) : null;
  const tambahan = opsi?.tambahan ?? 0;
  return {
    kunci: `${produk.id}-${varian ?? ""}`,
    id: produk.id,
    nama: produk.nama,
    foto_url: produk.foto_url,
    kategori: produk.kategori,
    harga: produk.harga + tambahan,
    hargaDasar: produk.harga,
    varian: varian ?? "",
    jumlah,
  };
}

function TombolJumlah({ jumlah, onUbah, nama, ringkas = false }) {
  return (
    <div className={`inline-flex items-center rounded-full border border-garis bg-white ${ringkas ? "h-8" : "h-10"}`} aria-label={`Jumlah ${nama}`}>
      <button
        type="button"
        onClick={() => onUbah(Math.max(1, jumlah - 1))}
        aria-label={`Kurangi jumlah ${nama}`}
        className="grid h-full w-9 place-items-center rounded-l-full text-lg hover:bg-permukaan"
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-semibold" aria-live="polite">{jumlah}</span>
      <button
        type="button"
        onClick={() => onUbah(jumlah + 1)}
        aria-label={`Tambah jumlah ${nama}`}
        className="grid h-full w-9 place-items-center rounded-r-full text-lg hover:bg-permukaan"
      >
        +
      </button>
    </div>
  );
}

function PanelKeranjang({ onTutup, drawer = false }) {
  const { items, ubahJumlah, hapus, kosongkan } = useKeranjang();
  const [metode, setMetode] = useState("Diantar");
  const jumlahItem = items.reduce((total, item) => total + item.jumlah, 0);
  const subtotal = items.reduce((total, item) => total + item.harga * item.jumlah, 0);
  const hrefPesan = linkWhatsApp(buatPesanKeranjang({ items, metode, total: subtotal }));

  return (
    <section
      aria-label="Ringkasan Pesanan"
      className={`cart-panel flex min-h-0 flex-col bg-panel ${drawer ? "h-full w-full max-w-md overflow-y-auto rounded-t-3xl p-5 shadow-panel sm:rounded-l-3xl sm:rounded-tr-none" : "h-full p-5"}`}
      role={drawer ? "dialog" : undefined}
      aria-modal={drawer ? "true" : undefined}
      aria-labelledby={drawer ? "judul-ringkasan" : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="judul-ringkasan" className="text-xl font-extrabold">Ringkasan Pesanan</h2>
          <p className="mt-1 text-xs text-teks-lembut">{jumlahItem} item</p>
        </div>
        {drawer ? (
          <button type="button" onClick={onTutup} className="grid h-11 w-11 place-items-center rounded-full hover:bg-permukaan" aria-label="Tutup ringkasan pesanan">
            <span aria-hidden="true" className="text-2xl">×</span>
          </button>
        ) : null}
      </div>

      <div className="cart-panel__methods mt-5 grid grid-cols-2 rounded-xl border border-garis bg-white p-1" aria-label="Pilih metode pesanan">
        {["Diantar", "Ambil di tempat"].map((pilihan) => (
          <button
            key={pilihan}
            type="button"
            aria-pressed={metode === pilihan}
            onClick={() => setMetode(pilihan)}
            className={`min-h-11 rounded-lg px-2 text-xs font-semibold transition-colors ${metode === pilihan ? "bg-peach text-aksen" : "text-teks-lembut hover:bg-permukaan"}`}
          >
            {pilihan}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="my-auto flex flex-col items-center py-10 text-center">
          <span aria-hidden="true" className="text-4xl">🛍️</span>
          <p className="mt-3 font-bold">Keranjang masih kosong</p>
          <p className="mt-1 max-w-56 text-sm text-teks-lembut">Pilih produk favoritmu untuk mulai memesan.</p>
        </div>
      ) : (
        <ul className="cart-panel__items mt-5 flex-1 space-y-4 overflow-y-auto">
          {items.map((item) => (
            <li key={item.kunci} className="flex gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-permukaan">
                <GambarProduk produk={item} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="line-clamp-1 text-sm font-bold">{item.nama}</p>
                    {item.varian ? <p className="line-clamp-1 text-xs text-teks-lembut">{item.varian}</p> : null}
                    <p className="mt-1 text-sm font-semibold text-harga">{formatRupiah(item.harga)}</p>
                  </div>
                  <button type="button" onClick={() => hapus(item.kunci)} aria-label={`Hapus ${item.nama} dari keranjang`} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-bahaya hover:bg-red-50">×</button>
                </div>
                <div className="mt-2">
                  <TombolJumlah jumlah={item.jumlah} onUbah={(jumlah) => ubahJumlah(item.kunci, jumlah)} nama={item.nama} ringkas />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 space-y-3 border-t border-garis pt-4">
        <div className="flex justify-between text-sm text-teks-lembut"><span>Subtotal</span><span>{formatRupiah(subtotal)}</span></div>
        <div className="flex justify-between text-sm text-teks-lembut"><span>Diskon</span><span>{formatRupiah(0)}</span></div>
        <div className="flex justify-between border-t border-garis pt-3 font-extrabold"><span>Total</span><span>{formatRupiah(subtotal)}</span></div>
        <a
          href={hrefPesan}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={items.length === 0}
          onClick={(event) => { if (!items.length) event.preventDefault(); }}
          className={`mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-bold text-white transition-colors ${items.length ? "bg-utama hover:bg-utama-gelap" : "pointer-events-none bg-teks-lembut"}`}
        >
          <IkonWhatsApp />
          Pesan via WhatsApp
        </a>
        {items.length > 0 ? (
          <button type="button" onClick={kosongkan} className="min-h-11 w-full rounded-full text-sm font-semibold text-teks-lembut hover:bg-permukaan">Kosongkan keranjang</button>
        ) : null}
      </div>
    </section>
  );
}

function MenuSamping({ pathname, bukaKeranjang, tutupDrawer, drawer = false }) {
  const links = [
    { label: "Beranda", href: "/", icon: "Beranda" },
    { label: "Menu Produk", href: "/#produk", icon: "Menu Produk" },
    { label: "Pesanan Saya", href: "#pesanan", icon: "Pesanan Saya", cart: true },
    { label: "Riwayat", href: "/riwayat", icon: "Riwayat" },
    { label: "Mitra/Perajin", href: "/mitra", icon: "Mitra/Perajin" },
    { label: "Pengaturan", href: "/pengaturan", icon: "Pengaturan" },
  ];
  const { jumlahItem } = useKeranjang();

  function aktif(item) {
    if (item.cart) return false;
    if (item.href === "/") return pathname === "/";
    if (item.href === "/#produk") return pathname.startsWith("/produk/");
    return pathname === item.href;
  }

  return (
    <div className={`store-sidebar__content flex h-full flex-col ${drawer ? "w-72 p-5" : "items-center px-2 py-6"}`}>
      <div className="mb-7 flex items-center gap-3 2xl:px-2">
        <Logo className="h-10 w-10 shrink-0" />
        <span className="store-sidebar__label text-base font-extrabold tracking-tight text-utama">{toko.nama}</span>
      </div>
      {drawer ? (
        <button type="button" aria-label="Tutup menu" onClick={tutupDrawer} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-2xl hover:bg-permukaan">×</button>
      ) : null}
      <nav aria-label="Navigasi utama" className="flex flex-1 flex-col gap-1">
        {links.map((item) => {
          const selected = aktif(item);
          const itemClass = `relative flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-utama ${selected ? "bg-peach font-bold text-aksen before:absolute before:bottom-2 before:left-0 before:top-2 before:w-1 before:rounded-full before:bg-aksen" : "text-teks-lembut hover:bg-permukaan hover:text-teks"}`;
          if (item.cart) {
            return (
              <button key={item.label} type="button" onClick={() => { tutupDrawer?.(); bukaKeranjang(); }} title="Pesanan Saya" className={`store-sidebar__link ${itemClass}`}>
                <IkonNavigasi nama={item.icon} className="h-5 w-5 shrink-0" /><span className="store-sidebar__label">{item.label}</span>
                {jumlahItem > 0 ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-aksen px-1 text-[10px] font-bold text-white" aria-label={`${jumlahItem} item di keranjang`}>{jumlahItem}</span> : null}
              </button>
            );
          }
          return (
            <Link key={item.label} href={item.href} onClick={tutupDrawer} aria-current={selected ? "page" : undefined} title={item.label} className={`store-sidebar__link ${itemClass}`}>
              <IkonNavigasi nama={item.icon} className="h-5 w-5 shrink-0" />
              <span className="store-sidebar__label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 flex flex-col gap-1 border-t border-garis pt-4">
        <a href={linkWhatsApp(buatPesanTanya())} target="_blank" rel="noopener noreferrer" title="Hubungi via WhatsApp" className="store-sidebar__link flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-utama hover:bg-hijau-latar">
          <IkonWhatsApp className="h-5 w-5 shrink-0" /><span className="store-sidebar__label">Hubungi via WhatsApp</span>
        </a>
        <button type="button" disabled title="Keluar hanya tersedia untuk admin" className="store-sidebar__link flex min-h-11 cursor-not-allowed items-center gap-3 rounded-xl px-3 text-left text-xs text-teks-lembut/70">
          <span aria-hidden="true" className="text-lg">↪</span><span className="store-sidebar__label">Keluar <span className="text-[10px]">(admin)</span></span>
        </button>
      </div>
    </div>
  );
}

function StorefrontShell({ children }) {
  const pathname = usePathname();
  const { items, jumlahItem, annonce } = useKeranjang();
  const [drawer, setDrawer] = useState(null);

  useEffect(() => {
    if (!drawer) return undefined;
    const sebelumnya = document.activeElement;
    const dialog = document.querySelector("[data-drawer-panel]");
    const fokus = dialog?.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled)');
    fokus?.[0]?.focus();
    const tanganiKeyboard = (event) => {
      if (event.key === "Escape") {
        setDrawer(null);
      } else if (event.key === "Tab" && fokus?.length) {
        const pertama = fokus[0];
        const terakhir = fokus[fokus.length - 1];
        if (event.shiftKey && document.activeElement === pertama) {
          event.preventDefault();
          terakhir.focus();
        } else if (!event.shiftKey && document.activeElement === terakhir) {
          event.preventDefault();
          pertama.focus();
        }
      }
    };
    window.addEventListener("keydown", tanganiKeyboard);
    return () => {
      window.removeEventListener("keydown", tanganiKeyboard);
      if (sebelumnya instanceof HTMLElement) sebelumnya.focus();
    };
  }, [drawer]);

  function bukaKeranjang() {
    if (window.matchMedia("(min-width: 1440px)").matches) {
      document.getElementById("panel-ringkasan")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    setDrawer("cart");
  }

  const jumlahHarga = items.reduce((total, item) => total + item.harga * item.jumlah, 0);

  return (
    <div className="min-h-screen px-2 pb-28 pt-3 sm:px-4 sm:py-5 lg:pb-5">
      <div className="storefront-app mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-[1720px] grid-cols-1 overflow-clip rounded-[28px] border border-white/80 bg-panel shadow-panel">
        <aside aria-label="Menu toko" className="storefront-sidebar sticky top-0 z-20 hidden h-screen max-h-[calc(100vh-2.5rem)] border-r border-garis bg-panel">
          <MenuSamping pathname={pathname} bukaKeranjang={bukaKeranjang} />
        </aside>
        <div className="min-w-0">
          <header className="storefront-mobile-header flex min-h-[68px] items-center justify-between border-b border-garis px-4 sm:px-6">
            <button type="button" onClick={() => setDrawer("menu")} aria-label="Buka menu navigasi" className="grid h-11 w-11 place-items-center rounded-xl hover:bg-permukaan">
              <span className="text-2xl" aria-hidden="true">☰</span>
            </button>
            <Link href="/" aria-label={toko.nama} className="flex items-center gap-2 text-sm font-extrabold text-utama"><Logo className="h-8 w-8" />{toko.nama}</Link>
            <button type="button" onClick={() => setDrawer("cart")} aria-label={`Buka keranjang, ${jumlahItem} item`} className="relative grid h-11 w-11 place-items-center rounded-xl hover:bg-permukaan">
              <IkonNavigasi nama="Pesanan Saya" />
              {jumlahItem > 0 ? <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-aksen px-1 text-[10px] font-bold text-white">{jumlahItem}</span> : null}
            </button>
          </header>
          <main id="konten-utama" className="storefront-main min-w-0 px-4 py-5 sm:px-6 sm:py-7">{children}</main>
        </div>
        <aside id="panel-ringkasan" aria-label="Ringkasan Pesanan" className="storefront-cart sticky top-0 hidden h-screen max-h-[calc(100vh-2.5rem)] border-l border-garis">
          <PanelKeranjang />
        </aside>
      </div>

      <p aria-live="polite" className="sr-only">{annonce}</p>

      {drawer ? (
        <div className="storefront-drawer fixed inset-0 z-50 flex bg-teks/40" onMouseDown={(event) => { if (event.target === event.currentTarget) setDrawer(null); }}>
          {drawer === "menu" ? (
            <aside data-drawer-panel role="dialog" aria-modal="true" className="relative h-full max-w-[85vw] bg-panel shadow-panel" aria-label="Menu navigasi">
              <MenuSamping pathname={pathname} bukaKeranjang={() => setDrawer("cart")} tutupDrawer={() => setDrawer(null)} drawer />
            </aside>
          ) : (
            <div className="cart-drawer mt-auto flex max-h-[90vh] w-full justify-center sm:my-auto sm:mr-4 sm:ml-auto sm:h-[min(760px,90vh)] sm:w-[min(420px,90vw)]">
              <div data-drawer-panel className="flex h-full w-full justify-center">
                <PanelKeranjang drawer onTutup={() => setDrawer(null)} />
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="storefront-bottom-nav fixed inset-x-0 bottom-0 z-40">
        {jumlahItem > 0 ? (
          <button type="button" onClick={() => setDrawer("cart")} className="flex min-h-12 w-full items-center justify-center gap-2 bg-karamel px-4 text-sm font-bold text-white">
            {jumlahItem} item <span aria-hidden="true">•</span> {formatRupiah(jumlahHarga)} <span className="underline underline-offset-2">Lihat pesanan</span>
          </button>
        ) : null}
        <nav aria-label="Navigasi bawah" className="grid min-h-16 grid-cols-4 border-t border-garis bg-panel px-2 pb-[env(safe-area-inset-bottom)]">
          {[
            { label: "Beranda", href: "/", icon: "Beranda" },
            { label: "Produk", href: "/#produk", icon: "Menu Produk" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-teks-lembut hover:text-utama">
              <IkonNavigasi nama={item.icon} className="h-5 w-5" />{item.label}
            </Link>
          ))}
          <button type="button" onClick={() => setDrawer("cart")} className="relative flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-teks-lembut hover:text-utama">
            <IkonNavigasi nama="Pesanan Saya" className="h-5 w-5" />Pesanan
            {jumlahItem > 0 ? <span className="absolute right-5 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-aksen px-1 text-[9px] text-white">{jumlahItem}</span> : null}
          </button>
          <a href={linkWhatsApp(buatPesanTanya())} target="_blank" rel="noopener noreferrer" className="flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-utama">
            <IkonWhatsApp className="h-5 w-5" />WhatsApp
          </a>
        </nav>
      </div>
    </div>
  );
}

export default function TataLetakUtama({ children }) {
  const pathname = usePathname();
  const [items, setItems] = useState([]);
  const [tersedia, setTersedia] = useState(false);
  const [annonce, setAnnonce] = useState("");
  const jumlahItem = useMemo(() => items.reduce((total, item) => total + item.jumlah, 0), [items]);

  useEffect(() => {
    try {
      const tersimpan = window.localStorage.getItem(KUNCI_KERANJANG);
      if (tersimpan) {
        const parsed = JSON.parse(tersimpan);
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((item) =>
            item &&
            typeof item.kunci === "string" &&
            typeof item.nama === "string" &&
            Number.isFinite(item.harga) &&
            Number.isInteger(item.jumlah) &&
            item.jumlah > 0
          ));
        }
      }
    } catch (error) {
      console.error("Keranjang tersimpan tidak dapat dibaca.", error);
    }
    setTersedia(true);
  }, []);

  useEffect(() => {
    if (!tersedia) return;
    try {
      window.localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(items));
    } catch (error) {
      console.error("Keranjang tidak dapat disimpan di perangkat ini.", error);
    }
  }, [items, tersedia]);

  const value = useMemo(() => ({
    items,
    jumlahItem,
    annonce,
    tambah(produk, jumlah, varian) {
      const itemBaru = buatDataKeranjang(produk, jumlah, varian);
      setAnnonce(`${jumlah} ${produk.nama} ditambahkan ke keranjang.`);
      setItems((sebelumnya) => {
        const ada = sebelumnya.find((item) => item.kunci === itemBaru.kunci);
        if (ada) return sebelumnya.map((item) => item.kunci === itemBaru.kunci ? { ...item, jumlah: item.jumlah + jumlah } : item);
        return [...sebelumnya, itemBaru];
      });
    },
    ubahJumlah(kunci, jumlah) {
      const item = items.find((produk) => produk.kunci === kunci);
      if (item) setAnnonce(`Jumlah ${item.nama} diperbarui menjadi ${jumlah}.`);
      setItems((sebelumnya) => sebelumnya.map((item) => item.kunci === kunci ? { ...item, jumlah: Math.max(1, jumlah) } : item));
    },
    hapus(kunci) {
      const item = items.find((produk) => produk.kunci === kunci);
      if (item) setAnnonce(`${item.nama} dihapus dari keranjang.`);
      setItems((sebelumnya) => sebelumnya.filter((produk) => produk.kunci !== kunci));
    },
    kosongkan() { setAnnonce("Keranjang dikosongkan."); setItems([]); },
  }), [items, jumlahItem, annonce]);

  if (pathname.startsWith("/admin")) {
    return (
      <div className="flex min-h-screen flex-col bg-latar">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4">{children}</main>
        <Footer />
      </div>
    );
  }

  return <KeranjangContext.Provider value={value}><StorefrontShell>{children}</StorefrontShell></KeranjangContext.Provider>;
}
