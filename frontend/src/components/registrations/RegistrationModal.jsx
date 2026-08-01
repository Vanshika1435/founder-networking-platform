import { useEffect, useState } from "react";

function RegistrationModal({
  open,
  users,
  events,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    user_id: "",
    event_id: "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        user_id: "",
        event_id: "",
      });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[450px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Register Member
        </h2>

        <select
          className="border rounded-xl w-full p-3 mb-5"
          value={form.user_id}
          onChange={(e) =>
            setForm({
              ...form,
              user_id: Number(e.target.value),
            })
          }
        >
          <option value="">
            Select Member
          </option>

          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded-xl w-full p-3 mb-6"
          value={form.event_id}
          onChange={(e) =>
            setForm({
              ...form,
              event_id: Number(e.target.value),
            })
          }
        >
          <option value="">
            Select Event
          </option>

          {events.map((event) => (
            <option
              key={event.id}
              value={event.id}
            >
              {event.title}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="bg-gray-200 px-5 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
          >
            Register
          </button>

        </div>

      </div>

    </div>
  );
}

export default RegistrationModal;