"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import PageHeader from "@/components/admin/shared/PageHeader";
import LoadingSpinner from "@/components/admin/shared/LoadingSpinner";

type Stats = {
  totalLeads: number;
  newLeads: number;
  followUpLeads: number;
  convertedLeads: number;
  lostLeads: number;
  totalGallery: number;
  totalCategories: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        const data = await res.json();
        if (!res.ok || !data.success) {
          toast.error("Failed to load dashboard");
          return;
        }
        setStats(data.stats);
      } catch {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of leads and gallery activity." />
      {loading || !stats ? <LoadingSpinner /> : <DashboardStats stats={stats} />}
    </div>
  );
}
