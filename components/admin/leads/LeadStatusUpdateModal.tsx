"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

import {
  buildKolkataDateTimeLocalValue,
  formatDateTime,
  getKolkataDateInputValue,
  getKolkataDateTimeParts,
  isKolkataDateTimeInPastOrNow,
} from "@/lib/lead-crm";
import type { Lead } from "@/components/admin/leads/LeadDetailModal";

type Props = {
  lead: Lead;
  nextStatus: Lead["status"];
  onClose: () => void;
  onSave: (payload: {
    status: Lead["status"];
    nextFollowUpAt: string | null;
    adminNote: string | null;
  }) => Promise<boolean>;
};

export default function LeadStatusUpdateModal({ lead, nextStatus, onClose, onSave }: Props) {
  const [saving, setSaving] = useState(false);
  const initialParts = getKolkataDateTimeParts(lead.nextFollowUpAt);
  const [followUpDate, setFollowUpDate] = useState(() => initialParts?.date ?? "");
  const [followUpHour, setFollowUpHour] = useState(() => initialParts?.hour ?? "09");
  const [followUpMinute, setFollowUpMinute] = useState(() => initialParts?.minute ?? "00");
  const [followUpPeriod, setFollowUpPeriod] = useState<"AM" | "PM">(() => initialParts?.period ?? "AM");
  const [adminNote, setAdminNote] = useState(() => lead.adminNote ?? "");
  const [error, setError] = useState("");

  const requiresFollowUp = nextStatus === "Follow-up";
  const minDate = getKolkataDateInputValue();

  const combinedFollowUp = useMemo(() => {
    const value = buildKolkataDateTimeLocalValue(followUpDate, followUpHour, followUpMinute, followUpPeriod);
    return value || null;
  }, [followUpDate, followUpHour, followUpMinute, followUpPeriod]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (requiresFollowUp && !combinedFollowUp) {
      setError("Please choose a follow-up date and time.");
      return;
    }

    if (requiresFollowUp && combinedFollowUp && isKolkataDateTimeInPastOrNow(combinedFollowUp)) {
      setError("Follow-up must be a future date and time.");
      return;
    }

    setSaving(true);
    try {
      const saved = await onSave({
        status: nextStatus,
        nextFollowUpAt: combinedFollowUp,
        adminNote: adminNote.trim() ? adminNote.trim() : null,
      });
      if (saved) {
        handleClose();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-4 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Update Lead Status</h2>
            <p className="mt-1 text-sm text-slate-500">{lead.name}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{nextStatus}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current Follow-up</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{formatDateTime(lead.nextFollowUpAt)}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Next Follow-up Date</label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                min={minDate}
                required={requiresFollowUp}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Next Follow-up Time</label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={followUpHour}
                  onChange={(e) => setFollowUpHour(e.target.value)}
                  required={requiresFollowUp}
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  {Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0")).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <select
                  value={followUpMinute}
                  onChange={(e) => setFollowUpMinute(e.target.value)}
                  required={requiresFollowUp}
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  {Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0")).map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
                <select
                  value={followUpPeriod}
                  onChange={(e) => setFollowUpPeriod(e.target.value as "AM" | "PM")}
                  required={requiresFollowUp}
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p> : null}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Admin Note</label>
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              rows={5}
              placeholder="Add follow-up context, call notes, or next action..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
