import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import SearchBar from "../../components/ui/SearchBar";
import EmptyState from "../../components/ui/EmptyState";
import DeleteDialog from "../../components/ui/DeleteDialog";
import BlogModal from "../../components/blog/BlogModal";

import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../services/blogService";

import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  User,
} from "lucide-react";

function BlogPage() {

  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {

    const value = search.toLowerCase();

    setFiltered(

      blogs.filter(

        (blog) =>

          blog.title.toLowerCase().includes(value) ||

          blog.author.toLowerCase().includes(value)

      )

    );

  }, [search, blogs]);

  const loadBlogs = async () => {

    try {

      const data = await getBlogs();

      setBlogs(data);

      setFiltered(data);

    }

    finally {

      setLoading(false);

    }

  };

  const saveBlog = async (data) => {

    if (editing) {

      await updateBlog(editing.id, data);

    }

    else {

      await createBlog(data);

    }

    setOpen(false);

    setEditing(null);

    loadBlogs();

  };

  const remove = async () => {

    await deleteBlog(selectedId);

    setDeleteOpen(false);

    loadBlogs();

  };

  if (loading) return <Loader />;

  return (

    <>

      <Card title="Blog Management">

        <div className="flex justify-between items-center mb-8">

          <SearchBar

            value={search}

            onChange={(e) => setSearch(e.target.value)}

          />

          <button

            onClick={() => {

              setEditing(null);

              setOpen(true);

            }}

            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"

          >

            <Plus size={18} />

            Create Blog

          </button>

        </div>

        {

          filtered.length === 0 ?

            (

              <EmptyState

                text="No Blogs Found"

              />

            )

            :

            (

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {

                  filtered.map((blog) => (

                    <div

                      key={blog.id}

                      className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition"

                    >

                      {

                        blog.image ?

                          (

                            <img

                              src={blog.image}

                              alt=""

                              className="h-52 w-full object-cover"

                            />

                          )

                          :

                          (

                            <div className="h-52 bg-gradient-to-r from-indigo-500 to-violet-500"></div>

                          )

                      }

                      <div className="p-6">

                        <h2 className="text-xl font-bold line-clamp-2">

                          {blog.title}

                        </h2>

                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-4">

                          <span className="flex items-center gap-1">

                            <User size={16} />

                            {blog.author}

                          </span>

                          <span className="flex items-center gap-1">

                            <Calendar size={16} />

                            {new Date(blog.created_at).toLocaleDateString()}

                          </span>

                        </div>

                        <p className="mt-4 text-slate-600 line-clamp-4">

                          {blog.content}

                        </p>

                        <div className="flex gap-3 mt-6">

                          <button

                            onClick={() => {

                              setEditing(blog);

                              setOpen(true);

                            }}

                            className="flex-1 bg-blue-100 hover:bg-blue-200 rounded-xl py-2 flex justify-center"

                          >

                            <Pencil size={18} />

                          </button>

                          <button

                            onClick={() => {

                              setSelectedId(blog.id);

                              setDeleteOpen(true);

                            }}

                            className="flex-1 bg-red-100 hover:bg-red-200 rounded-xl py-2 flex justify-center"

                          >

                            <Trash2 size={18} />

                          </button>

                        </div>

                      </div>

                    </div>

                  ))

                }

              </div>

            )

        }

      </Card>

      <BlogModal

        open={open}

        blog={editing}

        onClose={() => {

          setOpen(false);

          setEditing(null);

        }}

        onSave={saveBlog}

      />

      <DeleteDialog

        open={deleteOpen}

        onClose={() => setDeleteOpen(false)}

        onDelete={remove}

      />

    </>

  );

}

export default BlogPage;