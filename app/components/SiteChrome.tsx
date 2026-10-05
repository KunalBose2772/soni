"use client";

import { usePathname } from "next/navigation";

import FloatingContactButtons from "./FloatingContactButtons";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { QuoteModalProvider } from "./QuoteModalContext";
import QuoteModal from "./QuoteModal";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <QuoteModalProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <FloatingContactButtons />
      <ScrollToTop />
      <Footer />
      <QuoteModal />
    </QuoteModalProvider>
  );
}
