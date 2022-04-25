export default function Button({ text }) {
  return (
    <button
      type="submit"
      className="bg-slate-800 text-white uppercase py-2 px-7 rounded text-sm font-bold ml-auto mr-0 mt-4 block"
    >
      {text}
    </button>
  );
}
