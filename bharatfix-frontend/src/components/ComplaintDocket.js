import StatusBadge from "./StatusBadge";
import { formatDate } from "@/lib/format";

function ticketNo(id) {
  return `BF-${String(id ?? 0).padStart(5, "0")}`;
}

export default function ComplaintDocket({ complaint, children }) {
  return (
    <div className="docket fade-up rounded-sm p-5 pl-8 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-brass">{ticketNo(complaint.id)}</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-ink">
            {complaint.title}
          </h3>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      {complaint.description && (
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {complaint.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line pt-3 font-mono text-xs text-ink-soft">
        <span>Filed {formatDate(complaint.createdAt)}</span>
        {complaint.department?.name && <span>Dept: {complaint.department.name}</span>}
        {(complaint.latitude && complaint.longitude) && (
          <span>
            {complaint.latitude.toFixed(3)}, {complaint.longitude.toFixed(3)}
          </span>
        )}
      </div>

      {children && <div className="mt-4 border-t border-line pt-4">{children}</div>}
    </div>
  );
}
