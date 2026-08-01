function UserProfileModal({ open, onClose, user }) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[700px] max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-bold">
            Founder Profile
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl"
          >
            ×
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <Info label="Name" value={user.name} />
          <Info label="Email" value={user.email} />
          <Info label="Phone" value={user.phone} />
          <Info label="Company" value={user.company_name} />
          <Info label="Designation" value={user.designation} />
          <Info label="Industry" value={user.industry} />
          <Info label="Website" value={user.website} />
          <Info label="LinkedIn" value={user.linkedin} />
          <Info label="City" value={user.city} />

          <Info
            label="Approval"
            value={user.approval_status}
          />

          <Info
            label="Account"
            value={user.is_active ? "Active" : "Suspended"}
          />

        </div>

        <div className="mt-6">

          <h3 className="font-semibold mb-2">
            Bio
          </h3>

          <div className="border rounded-xl p-4 bg-gray-50">

            {user.bio || "-"}

          </div>

        </div>

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">
        {label}
      </p>

      <p className="font-semibold mt-1">
        {value || "-"}
      </p>
    </div>
  );
}

export default UserProfileModal;