import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getDashboardStats } from "../services/dashboardService";
import StatCard from "../components/dashboard/StatCard";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getDashboardStats();

    setStats(data);
  };

  if (!stats)
    return (
      <div className="container-shell py-20">
        Loading...
      </div>
    );

  return (
    <div className="container-shell py-10">

      <h1 className="mb-10 text-4xl font-bold">

        Welcome {user?.name} 👋

      </h1>

      <div className="grid gap-6 md:grid-cols-4">

        <StatCard
          title="Total Analyses"
          value={stats.total}
          color="text-blue-400"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          color="text-green-400"
        />

        <StatCard
          title="Failed"
          value={stats.failed}
          color="text-red-400"
        />

        <StatCard
          title="Languages"
          value={stats.languages}
          color="text-yellow-400"
        />

      </div>

      <h2 className="mt-12 mb-6 text-2xl font-semibold">
        Recent Analyses
      </h2>

      <div className="space-y-4">

        {stats.analyses.slice(0, 5).map((item) => (

          <div
            key={item._id}
            className="rounded-xl border border-base-border bg-[#111827] p-5"
          >

            <h3 className="font-semibold">

              {item.title}

            </h3>

            <p className="text-sm text-gray-400">

              {item.language}

            </p>

          </div>

        ))}

      </div>

      <div className="mt-10 flex gap-4">

        <Link
          to="/analyze"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          New Analysis
        </Link>

        <Link
          to="/history"
          className="rounded-lg bg-gray-700 px-6 py-3 text-white hover:bg-gray-600"
        >
          View History
        </Link>

      </div>

    </div>
  );
};

export default Dashboard;