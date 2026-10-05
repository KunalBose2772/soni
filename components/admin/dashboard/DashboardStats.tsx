"use client";

import { useRouter } from "next/navigation";
import { FolderOpen, Images, UserCheck, UserMinus, UserPlus, Users } from "lucide-react";

type Stats = {
  totalLeads: number;
  newLeads: number;
  followUpLeads: number;
  convertedLeads: number;
  lostLeads: number;
  totalGallery: number;
  totalCategories: number;
};

const cards = [
  { key: "totalLeads", label: "Total Leads", icon: Users, color: "bg-slate-900", href: "/admin/leads" },
  { key: "newLeads", label: "New Leads", icon: UserPlus, color: "bg-blue-600", href: "/admin/leads" },
  { key: "followUpLeads", label: "Follow-up Leads", icon: UserCheck, color: "bg-amber-500", href: "/admin/leads" },
  { key: "convertedLeads", label: "Converted Leads", icon: UserCheck, color: "bg-emerald-600", href: "/admin/leads" },
  { key: "lostLeads", label: "Lost Leads", icon: UserMinus, color: "bg-rose-600", href: "/admin/leads" },
  { key: "totalGallery", label: "Gallery Images", icon: Images, color: "bg-orange-600", href: "/admin/gallery" },
  { key: "totalCategories", label: "Categories", icon: FolderOpen, color: "bg-violet-600", href: "/admin/categories" },
] as const;

export default function DashboardStats({ stats }: { stats: Stats }) {
  const router = useRouter();

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, color, href }) => (
        <div
          key={key}
          onClick={() => router.push(href)}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-orange-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{stats[key]}</p>
            </div>
            <div className={`rounded-lg p-2.5 text-white ${color}`}>
              <Icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
