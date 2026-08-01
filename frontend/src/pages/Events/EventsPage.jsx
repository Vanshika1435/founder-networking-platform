import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import SearchBar from "../../components/ui/SearchBar";
import EmptyState from "../../components/ui/EmptyState";
import DataTable from "../../components/ui/DataTable";
import DeleteDialog from "../../components/ui/DeleteDialog";
import EventModal from "../../components/events/EventModal";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../services/eventService";

import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import {
  CalendarDays,
  Users,
  IndianRupee,
  Clock3,
} from "lucide-react";

function EventsPage() {

  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {

    const value = search.toLowerCase();

    setFiltered(

      events.filter(

        (event) =>

          event.title.toLowerCase().includes(value) ||

          event.speaker.toLowerCase().includes(value) ||

          event.venue.toLowerCase().includes(value)

      )

    );

  }, [search, events]);

  const loadEvents = async () => {

    try {

      const data = await getEvents();

      setEvents(data);

      setFiltered(data);

    }

    finally {

      setLoading(false);

    }

  };

  const saveEvent = async (data) => {

    if (editing) {

      await updateEvent(editing.id, data);

    }

    else {

      await createEvent(data);

    }

    setOpen(false);

    setEditing(null);

    loadEvents();

  };

  const remove = async () => {

    await deleteEvent(selectedId);

    setDeleteOpen(false);

    loadEvents();

  };

  const columns = [

    {
      key: "title",
      label: "Event",
      render: (row) => (
        <div>
          <p className="font-bold">
            {row.title}
          </p>

          <p className="text-xs text-slate-500">
            {row.speaker}
          </p>
        </div>
      ),
    },

    

    {
      key: "venue",
      label: "Venue",
      render: (row) => (
        <span className="text-slate-600">
          📍 {row.venue}
        </span>
      ),
    },

    {
      key: "event_date",
      label: "Date",
      render: (row) =>
        new Date(row.event_date).toLocaleDateString("en-IN"),
    },

    {
      key: "capacity",
      label: "Capacity",
      render: (row) => (
        <span className="font-semibold text-indigo-600">
          {row.capacity}
        </span>
      ),
    },

    {
      key: "ticket_price",
      label: "Price",
      render: (row) => (
        <span className="font-bold text-green-600">
          ₹{Number(row.ticket_price).toLocaleString()}
        </span>
      ),
    },

  ];

  if (loading) {

    return <Loader />;

  }

  return (

    <>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <StatCard
        title="Total Events"
        value={events.length}
        icon={<CalendarDays size={22} />}
        color="#4F46E5"
      />

      <StatCard
        title="Upcoming"
        value={
          events.filter(
            e => new Date(e.event_date) >= new Date()
          ).length
        }
        icon={<Clock3 size={22} />}
        color="#22C55E"
      />

      <StatCard
        title="Total Capacity"
        value={
          events.reduce(
            (sum,e)=>sum+(e.capacity||0),
            0
          )
        }
        icon={<Users size={22} />}
        color="#F97316"
      />

      <StatCard
        title="Potential Revenue"
        value={
          events.reduce(
            (sum, e) =>
              sum + (Number(e.ticket_price) || 0) * (Number(e.capacity) || 0),
            0
          )
        }
        icon={<IndianRupee size={22} />}
        color="#7C3AED"
      />

    </div>

      <Card title="Event Management">

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">
          <SearchBar

            value={search}

            onChange={(e) => setSearch(e.target.value)}

          />

          <button

            onClick={() => {

              setEditing(null);

              setOpen(true);

            }}

            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-white shadow-lg hover:scale-105 transition"

          >

            <Plus size={18} />

            Create Event

          </button>

        </div>

        {

          filtered.length === 0 ?

            (

              <EmptyState

                text="No Events Found"

              />

            )

            :

            (

              <DataTable

                columns={columns}

                data={filtered}

                actions={(row) => (

                  <div className="flex gap-2">

                    <button

                      onClick={() => {

                        setEditing(row);

                        setOpen(true);

                      }}

                      className="rounded-xl bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200 transition"

                    >

                      <Pencil size={18} />

                    </button>

                    <button

                      onClick={() => {

                        setSelectedId(row.id);

                        setDeleteOpen(true);

                      }}

                      className="rounded-xl bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200 transition"

                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                )}

              />

            )

        }

      </Card>

      <EventModal

        open={open}

        event={editing}

        onClose={() => {

          setOpen(false);

          setEditing(null);

        }}

        onSave={saveEvent}

      />

      <DeleteDialog

        open={deleteOpen}

        onClose={() => setDeleteOpen(false)}

        onDelete={remove}

      />

    </>

  );

}

export default EventsPage;