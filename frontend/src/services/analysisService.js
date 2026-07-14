import api from "./api";

export const createAnalysis = (data) =>
  api.post("/analysis", data);

export const getAllAnalyses = (params) =>
  api.get("/analysis", { params });

export const searchAnalyses = (q) =>
  api.get(`/analysis/search?q=${encodeURIComponent(q)}`);

export const getAnalysis = (id) =>
  api.get(`/analysis/${id}`);

export const deleteAnalysis = (id) =>
  api.delete(`/analysis/${id}`);