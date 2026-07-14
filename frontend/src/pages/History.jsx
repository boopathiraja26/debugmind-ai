import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getAllAnalyses,
  deleteAnalysis,
  searchAnalyses,
} from "../services/analysisService";

const History = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadHistory = async () => {
    try {
      setLoading(true);

      const res = await getAllAnalyses();

      setAnalyses(res.data.data.analyses);
    } catch (err) {
      toast.error(err.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSearch = async () => {
    try {
      if (!search.trim()) {
        loadHistory();
        return;
      }

      const res = await searchAnalyses(search);

      setAnalyses(res.data.data.analyses);
    } catch (err) {
      toast.error(err.message || "Search failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAnalysis(id);

      toast.success("Analysis deleted successfully");

      loadHistory();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="container-shell py-20 text-center">
        <h2 className="text-xl text-white">Loading history...</h2>
      </div>
    );
  }

  return (
    <div className="container-shell py-10">

      <div className="mb-8 flex flex-col gap-3 md:flex-row">

        <input
          type="text"
          placeholder="Search by title, language..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-base-border bg-[#111827] p-3 text-white outline-none"
        />

        <button
          onClick={handleSearch}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Search
        </button>

      </div>

      <h1 className="mb-8 text-3xl font-bold text-white">
        Analysis History
      </h1>

      {analyses.length === 0 ? (
        <div className="rounded-xl border border-base-border bg-[#111827] p-10 text-center">
          <h2 className="text-lg text-gray-400">
            No analyses found.
          </h2>
        </div>
      ) : (
        <div className="space-y-5">

          {analyses.map((item) => (

            <div
              key={item._id}
              className="rounded-xl border border-base-border bg-[#111827] p-6"
            >

              <Link to={`/history/${item._id}`}>

                <h2 className="text-xl font-semibold text-white hover:text-blue-400">
                  {item.title}
                </h2>

              </Link>

              <div className="mt-3 flex flex-wrap gap-3 text-sm">

                <span className="rounded bg-gray-800 px-3 py-1 text-gray-300">
                  {item.language}
                </span>

                <span
                  className={`rounded px-3 py-1 ${
                    item.status === "completed"
                      ? "bg-green-700 text-white"
                      : item.status === "failed"
                      ? "bg-red-700 text-white"
                      : "bg-yellow-600 text-white"
                  }`}
                >
                  {item.status}
                </span>

              </div>

              <p className="mt-4 text-sm text-gray-400">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-5 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default History;