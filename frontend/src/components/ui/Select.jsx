const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block font-medium text-ink"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-base-border bg-[#111827] p-3 text-white focus:border-brand-500 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;