const StatCard = ({ title, value, color }) => {
  return (
    <div className="rounded-2xl border border-base-border bg-base p-6 shadow">
      <p className="text-sm text-ink-muted">{title}</p>

      <h2
        className="mt-3 text-4xl font-bold"
        style={{ color }}
      >
        {value}
      </h2>
    </div>
  );
};

export default StatCard;