const StatCard = ({ title, value, color }) => {
  return (
    <div className="rounded-2xl border border-base-border bg-[#111827] p-6 shadow-lg">
      <p className="text-sm text-gray-400">{title}</p>

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