import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { getAnalysis } from "../services/analysisService";

const Section = ({ title, children }) => (
  <div className="rounded-xl border border-base-border bg-[#111827] p-6">
    <h2 className="mb-4 text-xl font-semibold text-white">
      {title}
    </h2>

    {children}
  </div>
);

const AnalysisDetails = () => {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = async () => {
    try {
      const res = await getAnalysis(id);

      setAnalysis(res.data.data.analysis);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(
      analysis.aiResponse.fixedCode
    );

    toast.success("Copied!");
  };

  if (loading)
    return (
      <div className="container-shell py-20">
        Loading...
      </div>
    );

  if (!analysis)
    return (
      <div className="container-shell py-20">
        Analysis not found
      </div>
    );

  return (
    <div className="container-shell py-10">

      <h1 className="mb-2 text-4xl font-bold text-white">
        {analysis.title}
      </h1>

      <div className="mb-10 flex gap-4">

        <span className="rounded bg-blue-700 px-4 py-2">
          {analysis.language}
        </span>

        <span className="rounded bg-green-700 px-4 py-2">
          {analysis.status}
        </span>

      </div>

      <div className="space-y-8">

        <Section title="Problem">

          <p>{analysis.aiResponse.problem}</p>

        </Section>

        <Section title="Reason">

          <p>{analysis.aiResponse.reason}</p>

        </Section>

        <Section title="Fixed Code">

          <button
            onClick={copyCode}
            className="mb-4 rounded bg-blue-600 px-4 py-2"
          >
            Copy Code
          </button>

          <SyntaxHighlighter
            language={analysis.language.toLowerCase()}
            style={oneDark}
          >
            {analysis.aiResponse.fixedCode}
          </SyntaxHighlighter>

        </Section>

        <Section title="Explanation">

          <p>{analysis.aiResponse.explanation}</p>

        </Section>

        <Section title="Best Practices">

          <ul className="list-disc space-y-2 pl-5">

            {analysis.aiResponse.bestPractices.map((item, i) => (
              <li key={i}>{item}</li>
            ))}

          </ul>

        </Section>

        <Section title="Performance Improvements">

          <ul className="list-disc space-y-2 pl-5">

            {analysis.aiResponse.performanceImprovements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}

          </ul>

        </Section>

        <Section title="Security Issues">

          <ul className="list-disc space-y-2 pl-5">

            {analysis.aiResponse.securityIssues.map((item, i) => (
              <li key={i}>{item}</li>
            ))}

          </ul>

        </Section>

      </div>

    </div>
  );
};

export default AnalysisDetails;