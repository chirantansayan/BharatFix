"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import ComplaintDocket from "@/components/ComplaintDocket";
import { useAuth } from "@/context/AuthContext";
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

const TABS = ["Complaints", "Departments", "Teams", "Users"];
const COMPLAINT_STATUSES = ["PENDING", "ONGOING", "RESOLVED"];
const ALLOCATION_STATUSES = ["ASSIGNED", "REJECTED", "SKIPPED"];

/* ---------------------------- Complaints tab ---------------------------- */

function AllocateForm({ complaint, departments, adminId, onDone }) {
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
        assignedBy: adminId,
        status,
      });
      onDone();
    } catch {
      setError("Couldn't allocate. Confirm the team belongs to the right department.");
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
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.teamName} {t.available ? "" : "(busy)"}
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

  const loadDetails = async () => {
    const next = !expanded;
    setExpanded(next);
    if (next) {
      const [u, a] = await Promise.all([
        getComplaintUpdates(complaint.id).catch(() => ({ data: [] })),
        getAllocationsForComplaint(complaint.id).catch(() => ({ data: [] })),
      ]);
      setUpdates(u.data);
      setAllocations(a.data);
    }
  };

  return (
    <ComplaintDocket complaint={complaint}>
      <button
        onClick={loadDetails}
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
                  {a.team?.teamName ?? `Team #${a.teamId}`} — {a.status}
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
              adminId={adminId}
              onDone={() => {
                loadDetails();
                loadDetails();
              }}
            />
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
              Post a status update
            </p>
            <UpdateForm
              complaint={complaint}
              adminId={adminId}
              onDone={() => {
                refresh();
                loadDetails();
              }}
            />
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

function AdminDashboardContent() {
  const { user } = useAuth();
  const [adminId, setAdminId] = useState(null);
  const [tab, setTab] = useState("Complaints");

  useEffect(() => {
    if (!user) return;
    getUserByUsername(user.username)
      .then((res) => setAdminId(res.data.id))
      .catch(() => setAdminId(null));
  }, [user]);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          Admin console
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
          Registry oversight
        </h1>

        <div className="mt-8 flex gap-1 border-b border-line">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium ${
                tab === t
                  ? "border-b-2 border-brass text-ink"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "Complaints" &&
            (adminId ? (
              <ComplaintsTab adminId={adminId} />
            ) : (
              <p className="text-sm text-ink-soft">Loading your admin profile…</p>
            ))}
          {tab === "Departments" && <DepartmentsTab />}
          {tab === "Teams" && <TeamsTab />}
          {tab === "Users" && <UsersTab />}
        </div>
      </main>
    </>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
