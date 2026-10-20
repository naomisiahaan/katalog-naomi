// Logo toko: huruf "N" dalam lingkaran hijau dengan titik emas hangat.
// Mudah diganti: ganti isi komponen ini dengan <img src="/logo.svg" alt={namaToko} />
// atau gambar logo asli, tanpa perlu menyentuh komponen lain.
import { toko } from "@/lib/toko";

export default function Logo({ className = "h-9 w-9" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label={`Logo ${toko.nama}`}
    >
      <circle cx="24" cy="24" r="24" fill="var(--color-utama)" />
      <path
        d="M14.5 34.5V13.5h5.1l8.8 13.4V13.5h5.1v21h-5.1l-8.8-13.4v13.4h-5.1z"
        fill="#ffffff"
      />
      <circle cx="37.5" cy="10.5" r="3.5" fill="var(--color-emas)" />
    </svg>
  );
}
