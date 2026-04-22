import API from "./axios";

export const getInstitutions = () => API.get("/institutions");