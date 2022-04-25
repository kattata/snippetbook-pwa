export default function Select({ label, name, values }) {
  console.log(values);
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 mt-3">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="border-solid border-slate-400 border rounded-sm px-2 py-1 text-slate-400"
      >
        {values.map((value) => (
          <>
            <option value={value._id}>{value.name}</option>
          </>
        ))}
      </select>
    </div>
  );
}
