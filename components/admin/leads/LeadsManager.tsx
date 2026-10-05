"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";
import { toast } from "sonner";

import LeadDetailModal, { type Lead } from "@/components/admin/leads/LeadDetailModal";
import LeadStatusUpdateModal from "@/components/admin/leads/LeadStatusUpdateModal";
import PageHeader from "@/components/admin/shared/PageHeader";
import LoadingSpinner from "@/components/admin/shared/LoadingSpinner";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { LEAD_STATUSES } from "@/lib/constants";
import { formatDateTime, isFollowUpOverdue, truncateText } from "@/lib/lead-crm";

type StatusCounts = {
  new: number;
  followUp: number;
  converted: number;
  lost: number;
};

export default function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    new: 0,
    followUp: 0,
    converted: 0,
    lost: 0,
  });
  const [todayFollowUps, setTodayFollowUps] = useState(0);
  const [overdueFollowUps, setOverdueFollowUps] = useState(0);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusModalLead, setStatusModalLead] = useState<Lead | null>(null);
  const [pendingStatus, setPendingStatus] = useState<Lead["status"] | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
        search,
        status: statusFilter,
      });
      const res = await fetch(`/api/leads?${params.toString()}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Failed to load leads");
        return;
      }
      setLeads(data.leads);
      setTotalPages(data.pagination.totalPages);
      setStatusCounts(data.statusCounts);
      setTodayFollowUps(data.todayFollowUps ?? 0);
      setOverdueFollowUps(data.overdueFollowUps ?? 0);
    } catch {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loading leads on mount/filter changes.
    void fetchLeads();
  }, [fetchLeads]);

  const applyUpdatedLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)));
    setSelectedLead((current) => (current?.id === updatedLead.id ? updatedLead : current));
  };

  const updateStatus = async (
    id: string,
    payload: {
      status: Lead["status"];
      nextFollowUpAt: string | null;
      adminNote: string | null;
    },
  ) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Failed to update lead");
        return false;
      }
      applyUpdatedLead(data.lead);
      toast.success("Lead updated");
      void fetchLeads();
      return true;
    } catch {
      toast.error("Failed to update lead");
      return false;
    }
  };

  const handleStatusChange = (lead: Lead, nextStatus: Lead["status"]) => {
    if (nextStatus === lead.status) return;

    if (nextStatus === "Follow-up" || nextStatus === "Converted" || nextStatus === "Lost") {
      setStatusModalLead(lead);
      setPendingStatus(nextStatus);
      return;
    }

    void updateStatus(lead.id, {
      status: nextStatus,
      nextFollowUpAt: null,
      adminNote: lead.adminNote ?? null,
    });
  };

  const statCards = [
    { label: "New", statusValue: "New", value: statusCounts.new, color: "border-blue-200 bg-blue-50 text-blue-800" },
    { label: "Follow-up", statusValue: "Follow-up", value: statusCounts.followUp, color: "border-amber-200 bg-amber-50 text-amber-800" },
    { label: "Converted", statusValue: "Converted", value: statusCounts.converted, color: "border-emerald-200 bg-emerald-50 text-emerald-800" },
    { label: "Lost", statusValue: "Lost", value: statusCounts.lost, color: "border-rose-200 bg-rose-50 text-rose-800" },
    { label: "Today Follow-up", statusValue: "", value: todayFollowUps, color: "border-orange-200 bg-orange-50 text-orange-800" },
    { label: "Overdue", statusValue: "", value: overdueFollowUps, color: "border-red-200 bg-red-50 text-red-800" },
  ];

  return (
    <div>
      <PageHeader title="Leads Management" description="Track and manage all quote requests." />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            onClick={
              card.statusValue
                ? () => {
                    setStatusFilter(card.statusValue);
                    setPage(1);
                  }
                : undefined
            }
            className={`rounded-xl border p-4 transition-all ${card.color} ${
              card.statusValue ? `cursor-pointer ${statusFilter === card.statusValue ? "ring-2 ring-orange-400" : "hover:shadow-md"}` : ""
            }`}
          >
            <p className="text-sm font-medium">{card.label}</p>
            <p className="mt-1 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search name, phone, email, locations..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
        >
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {["Name", "Phone", "Moving From", "Moving To", "Move Date", "Next Follow-up", "Note", "Status", "Action"].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-slate-500">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`border-t border-slate-100 ${isFollowUpOverdue(lead.nextFollowUpAt, lead.status) ? "bg-rose-50/70" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">{lead.name}</td>
                      <td className="px-4 py-3">{lead.phone}</td>
                      <td className="px-4 py-3">{lead.movingFrom}</td>
                      <td className="px-4 py-3">{lead.movingTo}</td>
                      <td className="px-4 py-3">{formatDateTime(lead.moveDate)}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <span>{formatDateTime(lead.nextFollowUpAt)}</span>
                          {isFollowUpOverdue(lead.nextFollowUpAt, lead.status) ? (
                            <span className="inline-flex w-fit rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-700">
                              Overdue
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-4 py-3" title={lead.adminNote ?? ""}>
                        {truncateText(lead.adminNote)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead, e.target.value as Lead["status"])}
                            className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
                          >
                            {LEAD_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                          >
                            <Eye size={14} />
                            View More
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {leads.length === 0 ? (
              <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500">
                No leads found.
              </p>
            ) : (
              leads.map((lead) => (
                <div
                  key={lead.id}
                  className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${
                    isFollowUpOverdue(lead.nextFollowUpAt, lead.status) ? "bg-rose-50/70" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-900">{lead.name}</p>
                      <p className="text-sm text-slate-600">{lead.phone}</p>
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {lead.movingFrom} {"->"} {lead.movingTo}
                  </p>
                  <p className="text-sm text-slate-500">{formatDateTime(lead.moveDate)}</p>
                  <div className="mt-2 grid gap-2 rounded-xl bg-slate-50 p-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">Next Follow-up</span>
                      <span className="text-right font-medium text-slate-900">{formatDateTime(lead.nextFollowUpAt)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">Note</span>
                      <span className="max-w-[12rem] truncate text-right font-medium text-slate-900" title={lead.adminNote ?? ""}>
                        {truncateText(lead.adminNote)}
                      </span>
                    </div>
                    {isFollowUpOverdue(lead.nextFollowUpAt, lead.status) ? (
                      <div className="rounded-lg bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700">
                        Overdue follow-up
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead, e.target.value as Lead["status"])}
                      className="flex-1 rounded-lg border border-slate-200 px-2 py-2 text-sm"
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setSelectedLead(lead)}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                    >
                      View More
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 ? (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-slate-600">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          ) : null}
        </>
      )}

      {selectedLead ? <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} /> : null}
      {statusModalLead && pendingStatus ? (
        <LeadStatusUpdateModal
          lead={statusModalLead}
          nextStatus={pendingStatus}
          onClose={() => {
            setStatusModalLead(null);
            setPendingStatus(null);
          }}
          onSave={(payload) => updateStatus(statusModalLead.id, payload)}
        />
      ) : null}
    </div>
  );
}
