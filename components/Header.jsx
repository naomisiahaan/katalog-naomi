import Link from "next/link";
import Logo from "@/components/Logo";
import { namaTokoTerbagi, toko } from "@/lib/toko";

export default function Header() {
  return (
    <header className="border-b border-garis bg-latar">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9 shrink-0" />
          <span className="text-lg tracking-tight">
            {/* Di layar sempit hanya nama pendek supaya tidak terpotong */}
            <span className="font-extrabold text-utama">{namaTokoTerbagi.awal}</span>
            <span className="hidden font-semibold text-emas sm:inline"> {namaTokoTerbagi.akhir}</span>
          </span>
          <span className="sr-only">{toko.nama}</span>
        </Link>
      </div>
    </header>
  );
}
