import {
  Building2,
  MapPin,
  Globe,
} from "lucide-react";

function FounderCard({ founder, onView }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition-all">

      <div className="flex items-center gap-4">

        <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-700">

          {founder.name?.charAt(0)}

        </div>

        <div>

          <h2 className="text-xl font-bold">

            {founder.name}

          </h2>

          <p className="text-slate-500">

            {founder.designation}

          </p>

        </div>

      </div>

      <div className="space-y-3 mt-6">

        <p className="flex items-center gap-2">

          <Building2 size={18} />

          {founder.company_name || "-"}

        </p>

        <p className="flex items-center gap-2">

          <MapPin size={18} />

          {founder.city || "-"}

        </p>

        <p>

          {founder.industry || "-"}

        </p>

      </div>

      <div className="flex gap-3 mt-6">

        {founder.website && (

          <a
            href={founder.website}
            target="_blank"
            className="text-indigo-600"
          >
            <Globe />
          </a>

        )}

        {/*founder.linkedin && (

          <a
            href={founder.linkedin}
            target="_blank"
            className="text-blue-600"
          >
            <LinkedinIcon />
          </a>

        )}*/}

      </div>

      <button
        onClick={() => onView(founder)}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3"
      >
        View Profile
      </button>

    </div>
  );
}

export default FounderCard;