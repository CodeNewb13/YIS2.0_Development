import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Youth in STEM Indonesia",
  description: "Panel Kontrol Manajemen Event, Pendaftar, dan Komunitas Youth in STEM Indonesia.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1C2533] antialiased">
      {children}
    </div>
  );
}
