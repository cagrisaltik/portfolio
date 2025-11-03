import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // <-- YENİ EKLENEN SATIR
import PageWrapper from "@/components/PageWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Çağrı Saltık",
  description: "Yaptığım projeleri ve özgeçmişimi bulabilirsiniz.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-zinc-900 text-white`}>
        <Navbar />
        {/* children'ı PageWrapper ile sarıyoruz */}
        <PageWrapper> 
          <main className="container mx-auto p-4 min-h-[calc(100vh-150px)]">
            {children}
          </main>
        </PageWrapper>
        <Footer />
      </body>
    </html>
  );
}