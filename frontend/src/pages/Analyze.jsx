import { useState } from "react";
import toast from "react-hot-toast";

import AnalysisForm from "../components/analysis/AnalysisForm";
import AnalysisResult from "../components/analysis/AnalysisResult";
import { createAnalysis } from "../services/analysisService";

const Analyze = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async (formData) => {
    try {
      setLoading(true);

      const { data } = await createAnalysis(formData);

      setAnalysis(data.data.analysis);

      toast.success("Bug analyzed successfully!");
    } catch (err) {
      toast.error(
        err?.message ||
          err?.response?.data?.message ||
          "Analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-shell py-10">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-ink">
          AI Bug Analysis
        </h1>

        <p className="mt-3 max-w-2xl text-ink-muted">
          Paste your source code and explain the issue.
          DebugMind AI will identify the problem,
          explain the root cause,
          generate corrected code,
          and suggest improvements.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">

        {/* LEFT */}

        <div className="rounded-2xl border border-base-border bg-base p-6 shadow-lg">

          <AnalysisForm
            loading={loading}
            onAnalyze={handleAnalyze}
          />

        </div>

        {/* RIGHT */}

        <div>

          {analysis ? (
            <AnalysisResult analysis={analysis} />
          ) : (
            <div className="flex h-full min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-base-border bg-base">

              <div className="text-center">

                <h2 className="mb-3 text-xl font-semibold text-ink">
                  No Analysis Yet
                </h2>

                <p className="max-w-sm text-sm text-ink-muted">
                  Fill the form and click
                  <strong> Analyze Bug </strong>
                  to receive an AI-powered explanation.
                </p>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Analyze;