import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import ClientLayout from '@/components/ClientLayout';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mocky Digital - Creative Digital Agency | Kenya",
  description: "Professional Digital Agency offering Graphics Design, Web Development, and Digital Marketing services in Kenya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
      </head>
      <body className={inter.className}>
        <Navbar />
        <ClientLayout>
          {children}
        </ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
