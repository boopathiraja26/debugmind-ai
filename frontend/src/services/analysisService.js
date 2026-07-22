import api from "./api";

export const createAnalysis = async (data) => {
  console.log("========== PAYLOAD ==========");
  console.log(data);
  console.log(JSON.stringify(data, null, 2));

  const response = await api.post("/analysis", data);

  return response;
};

export const getAllAnalyses = (params) =>
  api.get("/analysis", { params });

export const searchAnalyses = (q) =>
  api.get(`/analysis/search?q=${encodeURIComponent(q)}`);

export const getAnalysis = (id) =>
  api.get(`/analysis/${id}`);

export const deleteAnalysis = (id) =>
  api.delete(`/analysis/${id}`);