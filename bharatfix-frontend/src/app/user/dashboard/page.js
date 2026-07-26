"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import ComplaintDocket from "@/components/ComplaintDocket";
import { formatDateTime } from "@/lib/format";
import {
  getAllDepartments,
  createComplaint,
  getMyComplaints,
  getComplaintUpdates,
  addFeedback,
} from "@/lib/endpoints";

const EMPTY_FORM = {
  title: "",
  description: "",
  departmentId: "",
  photoUrl: "",
  latitude: "",
  longitude: "",
};

function TimelineAndFeedback({ complaint }) {
  const [open, setOpen] = useState(false);
  const [updates, setUpdates] = useState(null);
  const [loadingUpdates, setLoadingUpdates] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 5, comment: "" });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  const loadUpdates = async () => {
    setOpen((o) => !o);
    if (updates !== null) return;
    setLoadingUpdates(true);
    try {
      const res = await getComplaintUpdates(complaint.id);
      setUpdates(res.data);
    } catch {
      setUpdates([]);
    } finally {
      setLoadingUpdates(false);
    }
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    setFeedbackError("");
    try {
      await addFeedback({
        complaintId: complaint.id,
        rating: Number(feedback.rating),
        comment: feedback.comment,
      });
      setFeedbackSent(true);
    } catch {
      setFeedbackError("Couldn't submit feedback. Try again shortly.");
    }
  };

  return (
    <div>
      <button
        onClick={loadUpdates}
        className="font-mono text-xs uppercase tracking-wide text-brass hover:underline"
      >
        {open ? "Hide timeline" : "View timeline"}
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          {loadingUpdates && <p className="text-xs text-ink-soft">Loading…</p>}
          {updates && updates.length === 0 && (
            <p className="text-xs text-ink-soft">No status updates posted yet.</p>
          )}
          {updates &&
            updates.map((u) => (
              <div key={u.id} className="border-l-2 border-line-strong pl-3 text-sm">
                <p className="font-mono text-xs text-ink-soft">
                  {u.updatedAt ? formatDateTime(u.updatedAt) : ""} · {u.status}
                </p>
                {u.message && <p className="text-ink-soft">{u.message}</p>}
              </div>
            ))}

          {complaint.status === "RESOLVED" && (
            <div className="mt-4 rounded-sm border border-line bg-paper p-4">
              {feedbackSent ? (
                <p className="text-sm status-resolved">Thanks — your feedback was recorded.</p>
              ) : (
                <form onSubmit={submitFeedback} className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                    Leave feedback
                  </p>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-ink-soft" htmlFor={`rating-${complaint.id}`}>
                      Rating
                    </label>
                    <select
                      id={`rating-${complaint.id}`}
                      value={feedback.rating}
                      onChange={(e) => setFeedback((f) => ({ ...f, rating: e.target.value }))}
                      className="rounded-sm border border-line-strong bg-paper-raised px-2 py-1 text-sm"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n} / 5
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    placeholder="How was the resolution?"
                    value={feedback.comment}
                    onChange={(e) => setFeedback((f) => ({ ...f, comment: e.target.value }))}
                    rows={2}
                    className="w-full rounded-sm border border-line-strong bg-paper-raised px-3 py-2 text-sm outline-none focus:border-ink"
                  />
                  {feedbackError && <p className="text-xs status-pending">{feedbackError}</p>}
                  <button
                    type="submit"
                    className="rounded-sm bg-ink px-3 py-1.5 text-xs font-medium text-paper hover:bg-[#2A3D4E]"
                  >
                    Submit feedback
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function UserDashboardContent() {
  const [departments, setDepartments] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [deptRes, complaintsRes] = await Promise.all([
        getAllDepartments(),
        getMyComplaints(),
      ]);
      setDepartments(deptRes.data);
      setComplaints(
        [...complaintsRes.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch {
      setLoadError("Couldn't load your dockets. Confirm the backend is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.title.trim() || !form.description.trim() || !form.departmentId) {
      setFormError("Title, description and department are required.");
      return;
    }
    setSubmitting(true);
    try {
      await createComplaint({
        title: form.title,
        description: form.description,
        departmentId: Number(form.departmentId),
        photoUrl: form.photoUrl || null,
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null,
      });
      setForm(EMPTY_FORM);
      setShowForm(false);
      load();
    } catch {
      setFormError("Couldn't file the complaint. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
              Your registry
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
              My complaints
            </h1>
          </div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-[#2A3D4E]"
          >
            {showForm ? "Cancel" : "File a new complaint"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-4 rounded-sm border border-line bg-paper-raised p-6"
          >
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                required
                placeholder="e.g. Overflowing garbage bin near bus stop"
                className="mt-1.5 w-full rounded-sm border border-line-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                required
                rows={3}
                placeholder="Describe the issue and where exactly it is"
                className="mt-1.5 w-full rounded-sm border border-line-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Department
                </label>
                <select
                  name="departmentId"
                  value={form.departmentId}
                  onChange={onChange}
                  required
                  className="mt-1.5 w-full rounded-sm border border-line-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {departments.length === 0 && (
                  <p className="mt-1 text-xs text-ink-soft">
                    No departments exist yet — ask an admin to create one first.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Photo URL (optional)
                </label>
                <input
                  name="photoUrl"
                  value={form.photoUrl}
                  onChange={onChange}
                  placeholder="https://…"
                  className="mt-1.5 w-full rounded-sm border border-line-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Latitude (optional)
                </label>
                <input
                  name="latitude"
                  value={form.latitude}
                  onChange={onChange}
                  placeholder="19.0760"
                  className="mt-1.5 w-full rounded-sm border border-line-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Longitude (optional)
                </label>
                <input
                  name="longitude"
                  value={form.longitude}
                  onChange={onChange}
                  placeholder="72.8777"
                  className="mt-1.5 w-full rounded-sm border border-line-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
                />
              </div>
            </div>

            {formError && <p className="text-sm status-pending">{formError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-[#2A3D4E] disabled:opacity-60"
            >
              {submitting ? "Filing…" : "File complaint"}
            </button>
          </form>
        )}

        <div className="mt-10 space-y-5">
          {loading && <p className="text-sm text-ink-soft">Loading your dockets…</p>}
          {loadError && <p className="text-sm status-pending">{loadError}</p>}
          {!loading && !loadError && complaints.length === 0 && (
            <p className="rounded-sm border border-dashed border-line-strong p-8 text-center text-sm text-ink-soft">
              You haven't filed any complaints yet.
            </p>
          )}
          {complaints.map((c) => (
            <ComplaintDocket key={c.id} complaint={c}>
              <TimelineAndFeedback complaint={c} />
            </ComplaintDocket>
          ))}
        </div>
      </main>
    </>
  );
}

export default function UserDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["USER"]}>
      <UserDashboardContent />
    </ProtectedRoute>
  );
}
