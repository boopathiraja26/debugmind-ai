import api from "./api";

export const analyzeCode = (data) => {
  return api.post("/analysis", data);
};