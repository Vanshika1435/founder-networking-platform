import { useEffect, useState } from "react";

function GalleryModal({
  open,
  onClose,
  onSave,
  item,
}) {

  const initial = {
    title: "",
    media_type: "Photo",
    category: "",
    event_name: "",
    year: "",
    media_url: "",
    description: "",
  };

  const [form, setForm] = useState(initial);

  useEffect(() => {
    if (item) {
      setForm(item);
    } else {
      setForm(initial);
    }
  }, [item]);

  if (!open) return null;

  const handle = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[700px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          {item ? "Edit Gallery" : "Add Gallery Item"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="title"
            placeholder="Title"
            className="border rounded-xl p-3"
            value={form.title}
            onChange={handle}
          />

          <select
            name="media_type"
            className="border rounded-xl p-3"
            value={form.media_type}
            onChange={handle}
          >
            <option>Photo</option>
            <option>Video</option>
          </select>

          <input
            name="category"
            placeholder="Category"
            className="border rounded-xl p-3"
            value={form.category}
            onChange={handle}
          />

          <input
            name="event_name"
            placeholder="Event Name"
            className="border rounded-xl p-3"
            value={form.event_name}
            onChange={handle}
          />

          <input
            name="year"
            placeholder="Year"
            className="border rounded-xl p-3"
            value={form.year}
            onChange={handle}
          />

          <input
            name="media_url"
            placeholder="Image / Video URL"
            className="border rounded-xl p-3"
            value={form.media_url}
            onChange={handle}
          />

        </div>

        <textarea
          rows={5}
          name="description"
          className="border rounded-xl w-full mt-4 p-3"
          value={form.description}
          onChange={handle}
          placeholder="Description"
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="bg-gray-200 rounded-xl px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="bg-indigo-600 text-white rounded-xl px-5 py-2"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

}

export default GalleryModal;