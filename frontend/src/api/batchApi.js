import API from "./axios";

export const createBatch = (data) => API.post("/batches", data);
export const generateInvite = (batchId) =>
  API.post(`/batches/${batchId}/invite`);
export const getTrainerBatches = () => API.get("/batches/trainer");

export const getInstitutionBatches = () =>
  API.get("/batches/institution");