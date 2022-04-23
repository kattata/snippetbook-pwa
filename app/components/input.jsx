export default function Input({ label, name, isTextarea, rows, value }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 mt-3">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          id={name}
          rows={rows}
          className="border-solid border-slate-400 border rounded-sm px-2 py-1 text-slate-400"
          defaultValue={value}
        ></textarea>
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          className="border-solid border-slate-400 border rounded-sm px-2 py-1 text-slate-400"
          defaultValue={value}
        />
      )}
    </div>
  );
}
