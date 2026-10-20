import Link from "next/link";

export default function HalamanSegeraHadir({ judul }) {
  return (
    <section className="flex min-h-[55vh] flex-col items-center justify-center py-12 text-center">
      <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-2xl bg-peach text-3xl">✦</span>
      <h1 className="mt-5 text-3xl font-extrabold">{judul}</h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-teks-lembut">Halaman ini sedang disiapkan. Kamu tetap bisa menjelajahi produk Naomi's Store.</p>
      <Link href="/" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-utama px-5 text-sm font-bold text-white hover:bg-utama-gelap">Kembali ke Menu Produk</Link>
    </section>
  );
}
