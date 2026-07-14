import CodeBlock from "./CodeBlock";

const Section = ({ title, children }) => (
  <div className="rounded-xl border border-base-border bg-base p-5">
    <h3 className="mb-3 text-lg font-semibold text-ink">
      {title}
    </h3>

    {children}
  </div>
);

const ListSection = ({ title, items }) => (
  <Section title={title}>
    {items?.length ? (
      <ul className="list-disc space-y-2 pl-5 text-ink-muted">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-ink-muted">
        No suggestions.
      </p>
    )}
  </Section>
);

const AnalysisResult = ({ analysis }) => {
  if (!analysis) return null;

  const ai = analysis.aiResponse;

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-ink">
        AI Analysis Result
      </h2>

      <Section title="Problem">
        <p className="text-ink-muted">
          {ai.problem}
        </p>
      </Section>

      <Section title="Root Cause">
        <p className="text-ink-muted">
          {ai.reason}
        </p>
      </Section>

      <Section title="Explanation">
        <p className="text-ink-muted whitespace-pre-wrap">
          {ai.explanation}
        </p>
      </Section>

      <Section title="Fixed Code">
        <CodeBlock code={ai.fixedCode} />
      </Section>

      <ListSection
        title="Best Practices"
        items={ai.bestPractices}
      />

      <ListSection
        title="Performance Improvements"
        items={ai.performanceImprovements}
      />

      <ListSection
        title="Security Issues"
        items={ai.securityIssues}
      />

    </div>
  );
};

export default AnalysisResult;