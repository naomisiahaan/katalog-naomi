import Link from "next/link";
import { toko } from "@/lib/toko";

export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-garis bg-permukaan">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 text-sm text-teks-lembut sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <p className="font-bold text-teks">{toko.nama}</p>
          <p className="mt-1">{toko.tagline}</p>
          <p className="mt-3">{toko.alamat}</p>
          <p>{toko.jamBuka}</p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end sm:text-right">
          <Link href="/admin" className="self-start underline underline-offset-4 hover:text-utama sm:self-auto">
            Masuk sebagai admin
          </Link>
          <p>
            © {tahun} {toko.nama}. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
