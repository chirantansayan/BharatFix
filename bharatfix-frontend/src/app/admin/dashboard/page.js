"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Bell,
  Building2,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  Users,
  X,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ComplaintDocket from "@/components/ComplaintDocket";
import StatusBadge from "@/components/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { formatDateTime } from "@/lib/format";
import {
  getAllComplaints,
  getAllDepartments,
  createDepartment,
  getTeamsByDepartment,
  getAvailableTeams,
  createTeam,
  allocateTeam,
  getAllocationsForComplaint,
  addComplaintUpdate,
  getComplaintUpdates,
  getAllUsers,
  deleteUser,
  getUserByUsername,
} from "@/lib/endpoints";

const COMPLAINT_STATUSES = ["PENDING", "ONGOING", "RESOLVED"];
const ALLOCATION_STATUSES = ["ASSIGNED", "REJECTED", "SKIPPED"];

/* ---------------------------- Complaints tab ---------------------------- */

function AllocateForm({ complaint, departments, onDone }) {
  const [departmentId, setDepartmentId] = useState(complaint.department?.id ?? "");
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [status, setStatus] = useState("ASSIGNED");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!departmentId) {
      setTeams([]);
      return;
    }
    getTeamsByDepartment(departmentId)
      .then((res) => setTeams(res.data))
      .catch(() => setTeams([]));
  }, [departmentId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!teamId) {
      setError("Choose a team first.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await allocateTeam({
        complaintId: complaint.id,
        teamId: Number(teamId),
        status,
      });
      onDone();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Couldn't allocate the team. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
      <select
        value={departmentId}
        onChange={(e) => {
          setDepartmentId(e.target.value);
          setTeamId("");
        }}
        className="rounded-sm border border-line-strong bg-paper px-2 py-1.5 text-xs"
      >
        <option value="">Department</option>
        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
      <select
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        className="rounded-sm border border-line-strong bg-paper px-2 py-1.5 text-xs"
      >
        <option value="">Team</option>
        {teams.filter((t) => t.available).map((t) => (
          <option key={t.id} value={t.id}>
            {t.teamName}
          </option>
        ))}
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-sm border border-line-strong bg-paper px-2 py-1.5 text-xs"
      >
        {ALLOCATION_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button
        disabled={busy}
        className="rounded-sm bg-ink px-3 py-1.5 text-xs font-medium text-paper hover:bg-[#2A3D4E] disabled:opacity-60"
      >
        Allocate
      </button>
      {error && <p className="col-span-full text-xs status-pending">{error}</p>}
    </form>
  );
}

function UpdateForm({ complaint, adminId, onDone }) {
  const [status, setStatus] = useState(complaint.status);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await addComplaintUpdate({
        complaintId: complaint.id,
        updatedBy: adminId,
        status,
        message,
      });
      setMessage("");
      onDone();
    } catch {
      setError("Couldn't post the update.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-2 sm:grid-cols-[0.8fr_2fr_auto]">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-sm border border-line-strong bg-paper px-2 py-1.5 text-xs"
      >
        {COMPLAINT_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Status note for the citizen…"
        className="rounded-sm border border-line-strong bg-paper px-2 py-1.5 text-xs"
      />
      <button
        disabled={busy}
        className="rounded-sm border border-line-strong px-3 py-1.5 text-xs font-medium text-ink hover:bg-paper"
      >
        Post update
      </button>
      {error && <p className="col-span-full text-xs status-pending">{error}</p>}
    </form>
  );
}

function AdminComplaintDocket({ complaint, departments, adminId, refresh }) {
  const [expanded, setExpanded] = useState(false);
  const [updates, setUpdates] = useState(null);
  const [allocations, setAllocations] = useState(null);

  const refreshDetails = async () => {
    const [u, a] = await Promise.all([
      getComplaintUpdates(complaint.id).catch(() => ({ data: [] })),
      getAllocationsForComplaint(complaint.id).catch(() => ({ data: [] })),
    ]);
    setUpdates(u.data);
    setAllocations(a.data);
  };

  const toggleDetails = async () => {
    if (!expanded) await refreshDetails();
    setExpanded((current) => !current);
  };

  return (
    <ComplaintDocket complaint={complaint}>
      <button
        onClick={toggleDetails}
        className="font-mono text-xs uppercase tracking-wide text-brass hover:underline"
      >
        {expanded ? "Hide detail" : "Manage docket"}
      </button>

      {expanded && (
        <div className="mt-4 space-y-5">
          {allocations && allocations.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                Allocations
              </p>
              {allocations.map((a) => (
                <p key={a.id} className="font-mono text-xs text-ink-soft">
                  {a.teamName ?? a.team?.teamName ?? `Team #${a.teamId}`} — {a.status}
                </p>
              ))}
            </div>
          )}

          {updates && updates.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                Timeline
              </p>
              {updates.map((u) => (
                <p key={u.id} className="border-l-2 border-line-strong pl-3 text-xs text-ink-soft">
                  {u.updatedAt ? formatDateTime(u.updatedAt) : ""} · {u.status}
                  {u.message ? ` — ${u.message}` : ""}
                </p>
              ))}
            </div>
          )}

          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
              Allocate a team
            </p>
            <AllocateForm
              complaint={complaint}
              departments={departments}
              onDone={() => {
                refresh();
                refreshDetails();
              }}
            />
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
              Post a status update
            </p>
            {adminId ? (
              <UpdateForm
                complaint={complaint}
                adminId={adminId}
                onDone={() => {
                  refresh();
                  refreshDetails();
                }}
              />
            ) : (
              <p className="text-xs text-ink-soft">Loading admin profile…</p>
            )}
          </div>
        </div>
      )}
    </ComplaintDocket>
  );
}

function ComplaintsTab({ adminId }) {
  const [complaints, setComplaints] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [cRes, dRes] = await Promise.all([getAllComplaints(), getAllDepartments()]);
      setComplaints(
        [...cRes.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setDepartments(dRes.data);
    } catch {
      setError("Couldn't load complaints. Confirm the backend is running and you're signed in as ADMIN.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible =
    filter === "ALL" ? complaints : complaints.filter((c) => c.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {["ALL", ...COMPLAINT_STATUSES].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-sm border px-3 py-1 text-xs font-mono uppercase tracking-wide ${
              filter === f
                ? "border-ink bg-ink text-paper"
                : "border-line-strong text-ink-soft hover:bg-paper-raised"
            }`}
          >
            {f} {f !== "ALL" && `(${complaints.filter((c) => c.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        {loading && <p className="text-sm text-ink-soft">Loading dockets…</p>}
        {error && <p className="text-sm status-pending">{error}</p>}
        {!loading && !error && visible.length === 0 && (
          <p className="rounded-sm border border-dashed border-line-strong p-8 text-center text-sm text-ink-soft">
            No complaints in this view.
          </p>
        )}
        {visible.map((c) => (
          <AdminComplaintDocket
            key={c.id}
            complaint={c}
            departments={departments}
            adminId={adminId}
            refresh={load}
          />
        ))}
      </div>
    </div>
  );
}

/* --------------------------- Departments tab --------------------------- */

function DepartmentsTab() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllDepartments();
      setDepartments(res.data);
    } catch {
      setError("Couldn't load departments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setBusy(true);
    setError("");
    try {
      await createDepartment(form);
      setForm({ name: "", description: "" });
      load();
    } catch {
      setError("Couldn't create the department.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.3fr]">
      <form onSubmit={submit} className="h-fit space-y-4 rounded-sm border border-line bg-paper-raised p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
          New department
        </p>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="e.g. Sanitation"
          required
          className="w-full rounded-sm border border-line-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Short description"
          rows={2}
          className="w-full rounded-sm border border-line-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
        />
        {error && <p className="text-xs status-pending">{error}</p>}
        <button
          disabled={busy}
          className="rounded-sm bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-[#2A3D4E] disabled:opacity-60"
        >
          Create department
        </button>
      </form>

      <div className="space-y-3">
        {loading && <p className="text-sm text-ink-soft">Loading…</p>}
        {!loading && departments.length === 0 && (
          <p className="text-sm text-ink-soft">No departments yet.</p>
        )}
        {departments.map((d) => (
          <div key={d.id} className="docket rounded-sm p-4 pl-7">
            <p className="font-mono text-xs text-brass">Dept #{d.id}</p>
            <h3 className="font-display text-base font-semibold text-ink">{d.name}</h3>
            {d.description && <p className="mt-1 text-sm text-ink-soft">{d.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Teams tab ------------------------------- */

function TeamsTab() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [teams, setTeams] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [form, setForm] = useState({ departmentId: "", teamName: "", available: true });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getAllDepartments().then((res) => setDepartments(res.data)).catch(() => {});
  }, []);

  const loadByDept = async (id) => {
    setSelectedDept(id);
    setShowAvailable(false);
    if (!id) {
      setTeams([]);
      return;
    }
    const res = await getTeamsByDepartment(id).catch(() => ({ data: [] }));
    setTeams(res.data);
  };

  const loadAvailable = async () => {
    setShowAvailable(true);
    setSelectedDept("");
    const res = await getAvailableTeams().catch(() => ({ data: [] }));
    setTeams(res.data);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.departmentId || !form.teamName.trim()) {
      setError("Department and team name are required.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await createTeam({
        departmentId: Number(form.departmentId),
        teamName: form.teamName,
        available: form.available,
      });
      setForm({ departmentId: "", teamName: "", available: true });
      if (selectedDept) loadByDept(selectedDept);
    } catch {
      setError("Couldn't create the team.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.3fr]">
      <form onSubmit={submit} className="h-fit space-y-4 rounded-sm border border-line bg-paper-raised p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">New team</p>
        <select
          value={form.departmentId}
          onChange={(e) => setForm((f) => ({ ...f, departmentId: e.target.value }))}
          required
          className="w-full rounded-sm border border-line-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
        >
          <option value="">Select department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <input
          value={form.teamName}
          onChange={(e) => setForm((f) => ({ ...f, teamName: e.target.value }))}
          placeholder="e.g. Ward 4 Crew"
          required
          className="w-full rounded-sm border border-line-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
        />
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
          />
          Available for allocation
        </label>
        {error && <p className="text-xs status-pending">{error}</p>}
        <button
          disabled={busy}
          className="rounded-sm bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-[#2A3D4E] disabled:opacity-60"
        >
          Create team
        </button>
      </form>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedDept}
            onChange={(e) => loadByDept(e.target.value)}
            className="rounded-sm border border-line-strong bg-paper px-3 py-2 text-sm"
          >
            <option value="">Browse by department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <button
            onClick={loadAvailable}
            className={`rounded-sm border px-3 py-2 text-xs font-mono uppercase tracking-wide ${
              showAvailable
                ? "border-ink bg-ink text-paper"
                : "border-line-strong text-ink-soft hover:bg-paper-raised"
            }`}
          >
            Show available teams
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {teams.length === 0 && (
            <p className="text-sm text-ink-soft">Choose a department, or view available teams.</p>
          )}
          {teams.map((t) => (
            <div key={t.id} className="docket flex items-center justify-between rounded-sm p-4 pl-7">
              <div>
                <p className="font-mono text-xs text-brass">Team #{t.id}</p>
                <h3 className="font-display text-base font-semibold text-ink">{t.teamName}</h3>
                {t.department?.name && (
                  <p className="text-xs text-ink-soft">{t.department.name}</p>
                )}
              </div>
              <span
                className={`font-mono text-xs uppercase ${
                  t.available ? "status-resolved" : "status-pending"
                }`}
              >
                {t.available ? "Available" : "Busy"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Users tab ------------------------------- */

function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch {
      setError("Couldn't load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id) => {
    if (!confirm("Remove this user? This cannot be undone.")) return;
    setBusyId(id);
    try {
      await deleteUser(id);
      setUsers((u) => u.filter((x) => x.id !== id));
    } catch {
      setError("Couldn't delete that user.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      {loading && <p className="text-sm text-ink-soft">Loading…</p>}
      {error && <p className="text-sm status-pending">{error}</p>}
      {!loading && (
        <div className="overflow-hidden rounded-sm border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-raised text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-line">
                  <td className="px-4 py-3 font-medium text-ink">{u.username}</td>
                  <td className="px-4 py-3 text-ink-soft">{u.email}</td>
                  <td className="px-4 py-3 font-mono text-xs">{u.role}</td>
                  <td className="px-4 py-3 font-mono text-xs">{u.status}</td>
                  <td className="px-4 py-3 text-right">
                    {u.role !== "ADMIN" && (
                      <button
                        onClick={() => remove(u.id)}
                        disabled={busyId === u.id}
                        className="text-xs font-medium status-pending hover:underline disabled:opacity-50"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="p-6 text-center text-sm text-ink-soft">No users registered yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------------- Page ---------------------------------- */

function MetricCard({ label, value, detail, tone = "sky" }) {
  const tones = {
    sky: "bg-sky-400/10 text-sky-300",
    emerald: "bg-emerald-400/10 text-emerald-300",
    amber: "bg-amber-400/10 text-amber-300",
    rose: "bg-rose-400/10 text-rose-300",
  };

  return (
    <section className="dashboard-card rounded-xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.14)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-slate-300">{label}</p>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
          {detail}
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
    </section>
  );
}

function OverviewTab({ onViewComplaints }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComplaints()
      .then((res) => setComplaints(res.data ?? []))
      .catch(() => setComplaints([]))
      .finally(() => setLoading(false));
  }, []);

  const counts = COMPLAINT_STATUSES.reduce(
    (result, status) => ({ ...result, [status]: complaints.filter((item) => item.status === status).length }),
    {}
  );
  const recent = [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  const chartPoints = "0,105 35,82 68,115 100,72 134,97 170,45 205,103 238,79 270,89 304,64 338,100 374,28 408,110 442,57 476,85 510,68 548,102 580,48";
  const heatmap = Array.from({ length: 84 }, (_, index) => (index * 11 + index * index * 3) % 9);

  return (
    <div className="space-y-4">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total complaints" value={loading ? "—" : complaints.length} detail="All time" />
        <MetricCard label="New today" value={loading ? "—" : recent.filter((item) => new Date(item.createdAt).toDateString() === new Date().toDateString()).length} detail="Live" tone="emerald" />
        <MetricCard label="Active cases" value={loading ? "—" : (counts.PENDING || 0) + (counts.ONGOING || 0)} detail="Needs action" tone="amber" />
        <MetricCard label="Resolved cases" value={loading ? "—" : counts.RESOLVED || 0} detail="Completed" tone="rose" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(290px,0.8fr)]">
        <div className="dashboard-card rounded-xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.14)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Complaint volume over time</h2>
              <p className="mt-1 text-xs text-slate-400">Last 14 days</p>
            </div>
            <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-300">14D</span>
          </div>
          <div className="mt-4 h-44 rounded-lg border border-white/5 bg-[linear-gradient(to_bottom,rgba(148,163,184,.12)_1px,transparent_1px)] bg-[size:100%_25%] p-3">
            <svg viewBox="0 0 580 140" className="h-full w-full" preserveAspectRatio="none" role="img" aria-label="Complaint volume trend">
              <defs>
                <linearGradient id="complaint-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={`${chartPoints} 580,140 0,140`} fill="url(#complaint-fill)" />
              <polyline points={chartPoints} fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="dashboard-card rounded-xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.14)]">
          <h2 className="text-sm font-semibold text-white">Case status</h2>
          <p className="mt-1 text-xs text-slate-400">Current workload split</p>
          <div className="mt-5 flex items-center justify-center gap-6">
            <div className="relative h-32 w-32 rounded-full bg-[conic-gradient(#22c55e_0_40%,#f59e0b_40%_73%,#f43f5e_73%_100%)]">
              <div className="absolute inset-5 grid place-items-center rounded-full bg-slate-900 text-center">
                <span className="text-xl font-semibold text-white">{complaints.length}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Cases</span>
              </div>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />Resolved {counts.RESOLVED || 0}</p>
              <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400" />Ongoing {counts.ONGOING || 0}</p>
              <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-400" />Pending {counts.PENDING || 0}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(350px,0.95fr)]">
        <div className="dashboard-card overflow-hidden rounded-xl border border-white/10 bg-slate-900/70 shadow-[0_12px_28px_rgba(0,0,0,0.14)]">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Recent complaints</h2>
              <p className="mt-1 text-xs text-slate-400">Newest reports across the municipality</p>
            </div>
            <button onClick={onViewComplaints} className="text-xs font-medium text-sky-300 hover:text-sky-200">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-left text-xs">
              <thead className="border-y border-white/5 bg-white/[0.025] text-slate-400">
                <tr><th className="px-4 py-2.5 font-medium">ID</th><th className="px-4 py-2.5 font-medium">Complaint</th><th className="px-4 py-2.5 font-medium">Department</th><th className="px-4 py-2.5 font-medium">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recent.map((item) => (
                  <tr key={item.id} className="text-slate-300"><td className="px-4 py-3 font-medium text-sky-300">#{item.id}</td><td className="max-w-44 truncate px-4 py-3 text-white">{item.title}</td><td className="px-4 py-3">{item.department?.name || "Unassigned"}</td><td className="px-4 py-3"><StatusBadge status={item.status} /></td></tr>
                ))}
                {!loading && recent.length === 0 && <tr><td colSpan="4" className="px-4 py-8 text-center text-slate-400">No complaints have been filed yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="dashboard-card rounded-xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.14)]">
          <h2 className="text-sm font-semibold text-white">Submission traffic</h2>
          <p className="mt-1 text-xs text-slate-400">Day and hour activity</p>
          <div className="mt-5 grid grid-cols-12 gap-1.5" aria-label="Complaint submission activity heatmap">
            {heatmap.map((level, index) => <span key={index} className={`aspect-square rounded-[3px] ${["bg-slate-700", "bg-sky-950", "bg-sky-900", "bg-sky-700", "bg-cyan-500", "bg-amber-400", "bg-orange-500", "bg-rose-500", "bg-sky-400"][level]}`} />)}
          </div>
          <div className="mt-4 flex justify-between text-[10px] uppercase tracking-wider text-slate-500"><span>Mon</span><span>Midday</span><span>Sun</span></div>
        </div>
      </section>
    </div>
  );
}

function AdminDashboardContent() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [adminId, setAdminId] = useState(null);
  const [tab, setTab] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    getUserByUsername(user.username)
      .then((res) => setAdminId(res.data.id))
      .catch(() => setAdminId(null));
  }, [user]);

  return (
    <div className={`dashboard-shell min-h-screen bg-[#0b1220] text-slate-100 ${theme === "light" ? "dashboard-light" : ""}`}>
      <aside className={`dashboard-sidebar fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-white/10 bg-[#0f1726] px-3 py-5 transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-3">
          <Link href="/" className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-black text-white shadow-lg shadow-sky-500/20">BF</span><span className="text-lg font-semibold tracking-tight text-white">Bharat<span className="text-sky-400">Fix</span></span></Link>
          <button onClick={() => setMenuOpen(false)} className="rounded-md p-1 text-slate-400 hover:bg-white/10 lg:hidden" aria-label="Close navigation"><X size={19} /></button>
        </div>
        <nav className="mt-9 space-y-1" aria-label="Admin navigation">
          {[
            ["Overview", LayoutDashboard], ["Complaints", ClipboardList], ["Departments", Building2], ["Teams", Users], ["Users", Users],
          ].map(([label, Icon]) => <button key={label} onClick={() => { setTab(label); setMenuOpen(false); }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${tab === label ? "bg-sky-400/15 text-sky-300" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"}`}><Icon size={18} strokeWidth={1.8} />{label}</button>)}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-4">
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"><LogOut size={18} />Log out</button>
        </div>
      </aside>
      {menuOpen && <button onClick={() => setMenuOpen(false)} className="fixed inset-0 z-20 bg-slate-950/70 lg:hidden" aria-label="Close navigation overlay" />}
      <div className="min-h-screen lg:pl-64">
        <header className="dashboard-header sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-white/10 bg-[#0b1220]/90 px-4 backdrop-blur md:px-7">
          <button onClick={() => setMenuOpen(true)} className="rounded-md p-2 text-slate-300 hover:bg-white/10 lg:hidden" aria-label="Open navigation"><Menu size={20} /></button>
          <label className="hidden max-w-sm flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-400 md:flex"><Search size={16} /><span className="text-sm">Search complaints...</span></label>
          <div className="ml-auto flex items-center gap-2 sm:gap-4"><button onClick={toggleTheme} className="rounded-md p-2 text-slate-400 hover:bg-white/10" aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>{theme === "light" ? <Moon size={19} /> : <Sun size={19} />}</button><button className="relative rounded-md p-2 text-slate-400 hover:bg-white/10" aria-label="Notifications"><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" /></button><div className="hidden text-right sm:block"><p className="text-sm font-medium text-white">{user?.username}</p><p className="text-xs text-slate-400">Administrator</p></div><span className="grid h-8 w-8 place-items-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-300">{user?.username?.slice(0, 2).toUpperCase()}</span></div>
        </header>
        <main className="mx-auto w-full max-w-[1500px] p-4 md:p-7">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-400">Municipal command center</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">{tab === "Overview" ? "Dashboard" : tab}</h1></div><div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">Updated just now</div></div>
          {tab === "Overview" && <OverviewTab onViewComplaints={() => setTab("Complaints")} />}
          {tab === "Complaints" && <ComplaintsTab adminId={adminId} />}
          {tab === "Departments" && <DepartmentsTab />}
          {tab === "Teams" && <TeamsTab />}
          {tab === "Users" && <UsersTab />}
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
