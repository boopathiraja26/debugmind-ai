const Textarea = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
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

      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-base-border bg-[#111827] p-3 text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
      />
    </div>
  );
};

export default Textarea;