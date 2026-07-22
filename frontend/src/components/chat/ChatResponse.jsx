import React from "react";
import ResponseCard from "./ResponseCard";
import { generateAnalysisPDF } from "../../utils/pdfGenerator";

const ChatResponse = ({ analysis }) => {
  if (!analysis) return null;

  const ai = analysis.aiResponse;

  return (
    <div className="my-4 flex w-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-xl">
            🤖
          </div>
          <h2 className="text-xl font-bold text-ink">AI Analysis Complete</h2>
        </div>
        
        <button
          onClick={() => generateAnalysisPDF(analysis)}
          className="flex items-center gap-2 rounded-xl border border-base-border bg-base px-4 py-2 text-sm text-ink-muted transition-colors hover:text-white"
        >
          📄 Download PDF
        </button>
      </div>

      <div className="flex w-full flex-col">
        <ResponseCard
          title="Problem"
          icon="📋"
          content={ai.problem}
        />
        
        <ResponseCard
          title="Root Cause"
          icon="🧠"
          content={ai.reason}
        />
        
        <ResponseCard
          title="Fixed Code"
          icon="💻"
          type="code"
          code={ai.fixedCode}
        />

        <ResponseCard
          title="Explanation"
          icon="📖"
          content={ai.explanation || "No explanation provided."}
        />
        
        <ResponseCard
          title="Best Practices"
          icon="✨"
          type="list"
          content={ai.bestPractices}
        />
        
        <ResponseCard
          title="Performance Suggestions"
          icon="⚡"
          type="list"
          content={ai.performanceImprovements}
        />
        
        <ResponseCard
          title="Security Issues"
          icon="🔐"
          type="list"
          content={ai.securityIssues}
        />
      </div>
    </div>
  );
};

export default ChatResponse;
