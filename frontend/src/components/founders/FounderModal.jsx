import {
  Building2,
  Briefcase,
  MapPin,
  BadgeCheck,
  UserCircle2,
  X,
} from "lucide-react";

import {
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
function FounderModal({
  founder,
  open,
  onClose,
}) {
  if (!open || !founder) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-5">

      <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 px-8 py-8 text-white relative">

          <button
            onClick={onClose}
            className="absolute right-6 top-6 bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-6">

            <div className="h-28 w-28 rounded-full bg-white flex items-center justify-center text-indigo-700 text-5xl font-bold shadow-lg">

              {founder.name?.charAt(0)}

            </div>

            <div>

              <h2 className="text-4xl font-bold">

                {founder.name}

              </h2>

              <p className="text-lg text-indigo-100 mt-2">

                {founder.designation || "Founder"}

              </p>

              <div className="flex gap-3 mt-4 flex-wrap">

                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">

                  {founder.approval_status || "Approved"}

                </span>

                <span
                  className={`px-4 py-1 rounded-full text-sm ${
                    founder.is_active
                      ? "bg-blue-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {founder.is_active ? "Active" : "Suspended"}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="grid md:grid-cols-2 gap-8 p-8">

          <div className="space-y-5">

            <div className="flex items-center gap-3">

              <Building2 className="text-indigo-600" />

              <div>

                <p className="text-gray-400 text-sm">

                  Company

                </p>

                <p className="font-semibold">

                  {founder.company_name || "-"}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Briefcase className="text-green-600" />

              <div>

                <p className="text-gray-400 text-sm">

                  Industry

                </p>

                <p className="font-semibold">

                  {founder.industry || "-"}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <MapPin className="text-red-500" />

              <div>

                <p className="text-gray-400 text-sm">

                  City

                </p>

                <p className="font-semibold">

                  {founder.city || "-"}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <FaPhone className="text-orange-500 text-xl" />

              <div>

                <p className="text-gray-400 text-sm">

                  Phone

                </p>

                <p className="font-semibold">

                  {founder.phone || "-"}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <FaEnvelope className="text-pink-500 text-xl" />

              <div>

                <p className="text-gray-400 text-sm">

                  Email

                </p>

                <p className="font-semibold">

                  {founder.email}

                </p>

              </div>

            </div>

          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-3">

              <FaGlobe className="text-blue-600 text-xl" />

              <div>

                <p className="text-gray-400 text-sm">

                  Website

                </p>

                {founder.website ? (
                  <a
                    href={founder.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {founder.website}
                  </a>
                ) : (
                  "-"
                )}

              </div>

            </div>

            <div className="flex items-center gap-3">

              <FaLinkedin className="text-sky-600 text-xl" />
              <div>

                <p className="text-gray-400 text-sm">

                  LinkedIn

                </p>

                {founder.linkedin ? (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {founder.linkedin}
                  </a>
                ) : (
                  "-"
                )}

              </div>

            </div>

            <div className="flex items-start gap-3">

              <UserCircle2 className="text-violet-600 mt-1" />

              <div>

                <p className="text-gray-400 text-sm">

                  Bio

                </p>

                <p className="leading-7 text-gray-700">

                  {founder.bio || "No bio available."}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="bg-slate-50 px-8 py-5 flex justify-between items-center border-t">

          <div className="flex items-center gap-2 text-green-600">

            <BadgeCheck size={20} />

            Verified Founder Profile

          </div>

          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default FounderModal;