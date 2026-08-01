import { SearchX } from "lucide-react";

function EmptyState({ text }) {
  return (

    <div className="flex flex-col items-center justify-center py-20">

      <SearchX
        size={60}
        className="text-slate-300"
      />

      <h2 className="mt-5 text-xl font-semibold">

        {text}

      </h2>

      <p className="text-slate-500 mt-2">

        Try changing your search.

      </p>

    </div>

  );
}

export default EmptyState;