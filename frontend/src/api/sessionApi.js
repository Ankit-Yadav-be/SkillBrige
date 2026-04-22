import API from "./axios";

export const createSession = (data) =>
  API.post("/sessions", data);

export const getSessions = () => API.get("/sessions");

export const getSessionsForBatch = (batchId) =>
  API.get(`/sessions/batch/${batchId}`);

export const getSessionAttendance = (id) =>
  API.get(`/sessions/${id}/attendance`);