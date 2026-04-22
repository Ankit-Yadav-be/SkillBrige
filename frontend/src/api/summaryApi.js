import API from "./axios";

// Batch Summary (Institution)
export const getBatchSummary = (batchId) =>
  API.get(`/summary/batches/${batchId}`);

// Institution Summary (Manager)
export const getInstitutionSummary = (institutionId) =>
  API.get(`/summary/institutions/${institutionId}`);

// Programme Summary (Manager + Monitor)
export const getProgrammeSummary = () =>
  API.get(`/summary/programme`);