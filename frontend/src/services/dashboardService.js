import { getAllAnalyses } from "./analysisService";

export const getDashboardStats = async () => {
  const res = await getAllAnalyses();

  const analyses = res.data.data.analyses;

  const total = analyses.length;

  const completed = analyses.filter(
    (item) => item.status === "completed"
  ).length;

  const failed = analyses.filter(
    (item) => item.status === "failed"
  ).length;

  const languages = new Set(
    analyses.map((item) => item.language)
  ).size;

  return {
    analyses,
    total,
    completed,
    failed,
    languages,
  };
};