const CONFIG = {
  PENDING: { label: "Pending", cls: "status-pending", dot: "bg-status-pending" },
  ONGOING: { label: "Ongoing", cls: "status-ongoing", dot: "bg-status-ongoing" },
  RESOLVED: { label: "Resolved", cls: "status-resolved", dot: "bg-status-resolved" },
  ASSIGNED: { label: "Assigned", cls: "status-ongoing", dot: "bg-status-ongoing" },
  REJECTED: { label: "Rejected", cls: "status-pending", dot: "bg-status-pending" },
  SKIPPED: { label: "Skipped", cls: "text-ink-soft", dot: "bg-ink-soft" },
};

export default function StatusBadge({ status }) {
  const cfg = CONFIG[status] || { label: status || "Unknown", cls: "text-ink-soft", dot: "bg-ink-soft" };
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wide ${cfg.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
