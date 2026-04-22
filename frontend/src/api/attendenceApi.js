import API from "./axios";

export const markAttendance = (data) =>
  API.post("/attendance/mark", data);