const StatCard = ({ title, value, color }) => {
  return (
    <div className="rounded-xl border border-base-border bg-[#111827] p-6">

      <h3 className="text-sm text-gray-400">
        {title}
      </h3>

      <h1
        className={`mt-3 text-4xl font-bold ${color}`}
      >
        {value}
      </h1>

    </div>
  );
};

export default StatCard;