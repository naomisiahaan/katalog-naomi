"use client";

import { useId } from "react";

// Placeholder foto: gradien lembut + ikon kategori + pola halus + label "Foto contoh".
// Begitu produk punya foto_url (foto asli), komponen ini otomatis memakai <img>.
// Ganti dengan foto asli: cukup isi kolom foto_url di database, tanpa ubah komponen.

const palet = {
  Minuman: { dari: "#e3f2e8", ke: "#b5d9c3", tinta: "#1f6b4f", ikon: "cangkir" },
  Camilan: { dari: "#fbf1d9", ke: "#eed9a8", tinta: "#7a4e09", ikon: "keripik" },
  Bumbu: { dari: "#fde5db", ke: "#f2bda6", tinta: "#9a3d1f", ikon: "botol" },
  "Kue kering": { dari: "#fcece3", ke: "#f0c7b5", tinta: "#8a4a2e", ikon: "toples" },
  Kerajinan: { dari: "#f1e9d7", ke: "#d8c39a", tinta: "#6b5322", ikon: "tas" },
  Kain: { dari: "#e6ebf5", ke: "#bfcbe4", tinta: "#3d4f7c", ikon: "kain" },
};

const paletBawaan = { dari: "#e8f1ea", ke: "#c2d9cb", tinta: "#1f6b4f", ikon: "daun" };

// Sudut gradien berubah sedikit per varian (untuk thumbnail galeri).
const sudut = [135, 45, 90, 160];

function IkonKategori({ jenis }) {
  const umum = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const isi = {
    cangkir: (
      <>
        <path d="M14 20h18v8a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8v-8z" {...umum} />
        <path d="M32 22h3a4.5 4.5 0 0 1 0 9h-3" {...umum} />
        <path d="M19 8c0 3 2 3 2 6M25 6c0 3 2 3 2 6" {...umum} />
      </>
    ),
    keripik: (
      <>
        <path d="M24 12c1.2 0 2.3.6 3 1.6l11 17c1.4 2.1-.2 4.9-2.7 4.9H12.7c-2.5 0-4.1-2.8-2.7-4.9l11-17c.7-1 1.8-1.6 3-1.6z" {...umum} />
        <circle cx="21" cy="28" r="1.6" fill="currentColor" />
        <circle cx="27" cy="32" r="1.6" fill="currentColor" />
      </>
    ),
    botol: (
      <>
        <path d="M20 8h8v6l4 6v18a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V20l4-6V8z" {...umum} />
        <path d="M16 26h16" {...umum} />
      </>
    ),
    toples: (
      <>
        <rect x="13" y="14" width="22" height="8" rx="2" {...umum} />
        <path d="M15 22h18v14a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4V22z" {...umum} />
        <path d="M24 27c-1.8-2-5-.6-5 1.7 0 2.2 2.6 3.8 5 5.8 2.4-2 5-3.6 5-5.8 0-2.3-3.2-3.7-5-1.7z" {...umum} />
      </>
    ),
    tas: (
      <>
        <path d="M11 18h26l-2.5 22h-21L11 18z" {...umum} />
        <path d="M18 18a6 6 0 0 1 12 0" {...umum} />
      </>
    ),
    kain: (
      <>
        <path d="M8 14c5.5-4 10.5 4 16 0s10.5-4 16 0v20c-5.5 4-10.5-4-16 0s-10.5 4-16 0V14z" {...umum} />
        <path d="M24 20l4 5-4 5-4-5 4-5z" {...umum} />
      </>
    ),
    daun: (
      <>
        <path d="M24 42C13 33 12 19 24 7c12 12 11 26 0 35z" {...umum} />
        <path d="M24 42V16" {...umum} />
      </>
    ),
  };

  return isi[jenis] ?? isi.daun;
}

export default function GambarProduk({ produk, varian = 0, className = "", prioritas = false }) {
  const id = useId().replace(/:/g, "");
  const alt = `Foto produk ${produk.nama}`;

  if (produk.foto_url) {
    return (
      <img
        src={produk.foto_url}
        alt={alt}
        className={className}
        loading={prioritas ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  const warna = palet[produk.kategori] ?? paletBawaan;
  const idGrad = `grad-${id}`;
  const idPola = `pola-${id}`;
  const sudutGradien = sudut[varian % sudut.length];

  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label={`${alt} (foto contoh)`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={idGrad} x1="0%" y1="0%" x2={sudutGradien > 90 ? "100%" : "0%"} y2="100%">
          <stop offset="0%" stopColor={warna.dari} />
          <stop offset="100%" stopColor={warna.ke} />
        </linearGradient>
        <pattern id={idPola} width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.6" fill={warna.tinta} opacity="0.12" />
        </pattern>
      </defs>
      <rect width="400" height="500" fill={`url(#${idGrad})`} />
      <rect width="400" height="500" fill={`url(#${idPola})`} />
      <circle cx={170 + varian * 20} cy="220" r="120" fill={warna.tinta} opacity="0.1" />
      <g color={warna.tinta} transform="translate(112 122) scale(3.7)">
        <IkonKategori jenis={warna.ikon} />
      </g>
      <text
        x="200"
        y="466"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
        fontSize="18"
        fontWeight="600"
        fill={warna.tinta}
        opacity="0.75"
      >
        Foto contoh
      </text>
    </svg>
  );
}
