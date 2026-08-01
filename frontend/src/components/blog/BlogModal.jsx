import { useEffect, useState } from "react";

function BlogModal({
  open,
  onClose,
  onSave,
  blog,
}) {

  const initial = {
    title: "",
    author: "",
    image: "",
    content: "",
  };

  const [form, setForm] = useState(initial);

  useEffect(() => {
    if (blog) {
      setForm(blog);
    } else {
      setForm(initial);
    }
  }, [blog]);

  if (!open) return null;

  const handle = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[700px]">

        <h2 className="text-2xl font-bold mb-6">
          {blog ? "Edit Blog" : "Create Blog"}
        </h2>

        <div className="space-y-4">

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handle}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handle}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handle}
            className="w-full border rounded-xl p-3"
          />

          <textarea
            rows={8}
            name="content"
            placeholder="Content..."
            value={form.content}
            onChange={handle}
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

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
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default BlogModal;