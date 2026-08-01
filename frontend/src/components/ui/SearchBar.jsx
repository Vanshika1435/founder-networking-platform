import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {

  return (

    <div className="relative w-full md:w-[420px]">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder="Search founders..."
        className="
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        py-3
        pl-12
        pr-5
        shadow-sm
        transition-all
        duration-300
        outline-none
        focus:border-indigo-500
        focus:ring-4
        focus:ring-indigo-100
        "
      />

    </div>

  );

}

export default SearchBar;