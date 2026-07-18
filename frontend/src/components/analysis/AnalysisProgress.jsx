const AnalysisProgress = ({ steps }) => {
  return (
    <div className="rounded-xl border border-base-border bg-base p-5">
      <h3 className="mb-4 text-lg font-semibold">
        🤖 AI Thinking...
      </h3>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-lg bg-secondary p-3 text-sm"
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisProgress;