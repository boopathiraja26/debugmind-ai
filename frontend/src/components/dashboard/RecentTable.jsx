const RecentTable = ({ recent }) => {
  return (
    <div className="rounded-2xl border border-base-border bg-base p-6">
      <h2 className="mb-5 text-xl font-semibold text-ink">
        Recent Analyses
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-ink-muted">
            <th>Title</th>
            <th>Language</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {recent.map((item) => (
            <tr
              key={item._id}
              className="border-t border-base-border"
            >
              <td className="py-4">{item.title}</td>

              <td>{item.language}</td>

              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTable;