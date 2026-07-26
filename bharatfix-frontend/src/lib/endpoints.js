import api from "./api";

/* ---------- Auth ---------- */
export const login = (username, password) =>
  api.post("/auth/login", { username, password });

export const registerUser = ({ username, password, email }) =>
  api.post("/users/register", { username, password, email });

/* ---------- Users ---------- */
export const getAllUsers = () => api.get("/users/all");
export const getUserById = (id) => api.get(`/users/id/${id}`);
export const getUserByUsername = (username) =>
  api.get(`/users/username/${username}`);
export const deleteUser = (id) => api.get(`/users/delete/${id}`);

/* ---------- Complaints ---------- */
export const createComplaint = (dto) => api.post("/complaints/send", dto);
export const getMyComplaints = () => api.get("/complaints/fetch");
export const getAllComplaints = () => api.get("/complaints/allcomplaints");

/* ---------- Complaint Allocations (admin assigns team) ---------- */
export const allocateTeam = (dto) => api.post("/complaintallocations", dto);
export const getAllocationsForComplaint = (complaintId) =>
  api.get(`/complaintallocations/complaint/${complaintId}`);

/* ---------- Complaint Updates (status/timeline) ---------- */
export const addComplaintUpdate = (dto) => api.post("/complaintupdates", dto);
export const getComplaintUpdates = (complaintId) =>
  api.get(`/complaintupdates/complaint/${complaintId}`);

/* ---------- Departments ---------- */
export const createDepartment = (dto) => api.post("/departments", dto);
export const getDepartment = (id) => api.get(`/departments/${id}`);
export const getAllDepartments = () => api.get("/departments");

/* ---------- Teams ---------- */
export const createTeam = (dto) => api.post("/teams/create", dto);
export const getTeam = (id) => api.get(`/teams/${id}`);
export const getTeamsByDepartment = (departmentId) =>
  api.get(`/teams/department/${departmentId}`);
export const getAvailableTeams = () => api.get("/teams/available");

/* ---------- Feedback ---------- */
export const addFeedback = (dto) => api.post("/feedbacks", dto);
export const getFeedbacksByComplaint = (complaintId) =>
  api.get(`/feedbacks/complaint/${complaintId}`);

/* ---------- Guest Users ---------- */
export const createGuestUser = (dto) => api.post("/guestusers", dto);
export const getGuestUserById = (id) => api.get(`/guestusers/${id}`);
