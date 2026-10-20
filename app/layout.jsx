import "./globals.css";
import TataLetakUtama from "@/components/TataLetakUtama";
import { deskripsiMeta, judulBeranda, toko } from "@/lib/toko";

export const metadata = {
  title: {
    default: judulBeranda,
    template: `%s | ${toko.nama}`,
  },
  description: deskripsiMeta,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: toko.nama,
    title: judulBeranda,
    description: deskripsiMeta,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <TataLetakUtama>{children}</TataLetakUtama>
      </body>
    </html>
  );
}
