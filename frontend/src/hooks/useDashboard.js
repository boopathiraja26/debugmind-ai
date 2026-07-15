import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const { data } = await getDashboardStats();
      setStats(data.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    reload: loadDashboard,
  };
};

export default useDashboard;