import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import SearchBar from "../../components/ui/SearchBar";
import EmptyState from "../../components/ui/EmptyState";
import DeleteDialog from "../../components/ui/DeleteDialog";

import GalleryModal from "../../components/gallery/GalleryModal";

import {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../../services/galleryService";

import {
  Plus,
  Pencil,
  Trash2,
  Image,
  Video,
  Calendar,
} from "lucide-react";

function GalleryPage() {

  const [gallery, setGallery] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadGallery();
  }, []);

  useEffect(() => {

    const value = search.toLowerCase();

    setFiltered(

      gallery.filter(

        (item) =>

          item.title.toLowerCase().includes(value) ||

          item.category.toLowerCase().includes(value) ||

          (item.event_name || "")
            .toLowerCase()
            .includes(value)

      )

    );

  }, [search, gallery]);

  const loadGallery = async () => {

    try {

      const data = await getGallery();

      setGallery(data);

      setFiltered(data);

    }

    finally {

      setLoading(false);

    }

  };

  const save = async (data) => {

    if (editing) {

      await updateGallery(editing.id, data);

    } else {

      await createGallery(data);

    }

    setOpen(false);

    setEditing(null);

    loadGallery();

  };

  const remove = async () => {

    await deleteGallery(selectedId);

    setDeleteOpen(false);

    loadGallery();

  };

  if (loading) return <Loader />;

  return (

    <>

      <Card title="Gallery">

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

            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-3 flex items-center gap-2"

          >

            <Plus size={18} />

            Add Media

          </button>

        </div>

        {

          filtered.length === 0 ?

            (

              <EmptyState

                text="Gallery is Empty"

              />

            )

            :

            (

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {

                  filtered.map((item) => (

                    <div

                      key={item.id}

                      className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition"

                    >

                      <img

                        src={item.media_url}

                        alt=""

                        className="h-60 w-full object-cover"

                      />

                      <div className="p-6">

                        <div className="flex justify-between items-start">

                          <h2 className="font-bold text-xl">

                            {item.title}

                          </h2>

                          {

                            item.media_type === "Photo"

                              ?

                              <Image size={20} />

                              :

                              <Video size={20} />

                          }

                        </div>

                        <div className="flex gap-2 mt-4 flex-wrap">

                          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">

                            {item.category}

                          </span>

                          <span className="bg-slate-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">

                            <Calendar size={14} />

                            {item.year}

                          </span>

                        </div>

                        {

                          item.event_name &&

                          <p className="mt-4 text-slate-500">

                            {item.event_name}

                          </p>

                        }

                        <p className="mt-4 text-slate-600 line-clamp-3">

                          {item.description}

                        </p>

                        <div className="flex gap-3 mt-6">

                          <button

                            onClick={() => {

                              setEditing(item);

                              setOpen(true);

                            }}

                            className="flex-1 bg-blue-100 hover:bg-blue-200 rounded-xl py-2 flex justify-center"

                          >

                            <Pencil size={18} />

                          </button>

                          <button

                            onClick={() => {

                              setSelectedId(item.id);

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

      <GalleryModal

        open={open}

        item={editing}

        onClose={() => {

          setOpen(false);

          setEditing(null);

        }}

        onSave={save}

      />

      <DeleteDialog

        open={deleteOpen}

        onClose={() => setDeleteOpen(false)}

        onDelete={remove}

      />

    </>

  );

}

export default GalleryPage;