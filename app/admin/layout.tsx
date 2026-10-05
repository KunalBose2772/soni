import type { Metadata } from "next";

import AdminLayoutShell from "@/components/admin/AdminLayoutShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Admin | Sony Packers and Movers",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
