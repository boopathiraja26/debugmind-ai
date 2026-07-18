import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AnalysisForm from "../components/analysis/AnalysisForm";
import AnalysisResult from "../components/analysis/AnalysisResult";
import AnalysisProgress from "../components/analysis/AnalysisProgress";

import { createAnalysis } from "../services/analysisService";
import {
  connectAnalysisStream,
  closeAnalysisStream,
} from "../services/streamService";

const Analyze = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    connectAnalysisStream(
      (message) => {
        setSteps((prev) => [...prev, message]);
      },
      () => {},
      () => {
        console.log("SSE Closed");
      }
    );

    return () => {
      closeAnalysisStream();
    };
  }, []);

  const handleAnalyze = async (formData) => {
    try {
      setLoading(true);
      setAnalysis(null);
      setSteps([]);

      const response = await createAnalysis(formData);

      const analysisData =
        response?.data?.data?.analysis ||
        response?.data?.analysis ||
        response?.analysis;

      setAnalysis(analysisData);

      toast.success("Analysis completed successfully!");
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          err?.message ||
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
          Paste your source code and describe the issue.
          DebugMind AI will analyze the bug,
          explain the root cause,
          generate fixed code,
          and provide best practices.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[45%_55%]">
        {/* LEFT */}
        <div className="rounded-2xl border border-base-border bg-base p-6 shadow-lg">
          <AnalysisForm
            loading={loading}
            onAnalyze={handleAnalyze}
          />
        </div>

        {/* RIGHT */}
        <div>
          {loading ? (
            <AnalysisProgress steps={steps} />
          ) : analysis ? (
            <AnalysisResult analysis={analysis} />
          ) : (
            <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-base-border bg-base">
              <div className="text-center">
                <h2 className="mb-3 text-xl font-semibold text-ink">
                  No Analysis Yet
                </h2>

                <p className="text-sm text-ink-muted">
                  Submit your code to receive an AI-powered analysis.
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