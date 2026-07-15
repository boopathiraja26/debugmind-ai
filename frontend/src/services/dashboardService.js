import api from "./api";

/**
 * Fetch dashboard statistics from the backend.
 * GET /api/dashboard
 */
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard");
  return response;
};