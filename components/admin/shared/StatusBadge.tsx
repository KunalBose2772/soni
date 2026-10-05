import type { LeadStatus } from "@/lib/constants";

const styles: Record<LeadStatus, string> = {
  New: "bg-blue-100 text-blue-800",
  "Follow-up": "bg-amber-100 text-amber-800",
  Converted: "bg-emerald-100 text-emerald-800",
  Lost: "bg-rose-100 text-rose-800",
};

export default function StatusBadge({ status }: { status: string }) {
  const className = styles[status as LeadStatus] ?? "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>
      {status}
    </span>
  );
}
