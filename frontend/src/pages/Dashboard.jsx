import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getDashboardStats } from "../services/dashboardService";
import StatCard from "../components/dashboard/StatCard";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data } = await getDashboardStats();
      setStats(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-shell py-20 text-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="container-shell py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Welcome, {user?.name} 👋
        </h1>

        <p className="mt-2 text-gray-400">
          Here's an overview of your DebugMind AI activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Analyses"
          value={stats.totalAnalyses}
          color="#3B82F6"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          color="#22C55E"
        />

        <StatCard
          title="Failed"
          value={stats.failed}
          color="#EF4444"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          color="#F59E0B"
        />

        <StatCard
          title="Today's Analyses"
          value={stats.today}
          color="#8B5CF6"
        />

        <StatCard
          title="This Week"
          value={stats.thisWeek}
          color="#06B6D4"
        />

        <StatCard
          title="Success Rate"
          value={`${stats.successRate}%`}
          color="#10B981"
        />

        <StatCard
          title="Top Language"
          value={stats.mostUsedLanguage || "-"}
          color="#EC4899"
        />
      </div>

      {/* Recent */}
      <div className="mt-12 rounded-2xl border border-base-border bg-[#111827] p-6">
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Recent Analyses
        </h2>

        {stats.recent?.length === 0 ? (
          <p className="text-gray-400">
            No analyses yet.
          </p>
        ) : (
          <div className="space-y-4">
            {stats.recent.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-xl border border-base-border bg-[#1F2937] p-5"
              >
                <div>
                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {item.language}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.status === "completed"
                      ? "bg-green-600 text-white"
                      : item.status === "failed"
                      ? "bg-red-600 text-white"
                      : "bg-yellow-600 text-white"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          to="/analyze"
          className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          + New Analysis
        </Link>

        <Link
          to="/history"
          className="rounded-xl bg-gray-700 px-6 py-3 text-white transition hover:bg-gray-600"
        >
          View History
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;