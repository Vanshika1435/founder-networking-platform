import {
  CalendarDays,
  MapPin,
  ArrowRight,
} from "lucide-react";

function UpcomingEventsTable({ dashboard }) {

  return (

    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Upcoming Events
        </h2>

        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
          {dashboard.recent_events.length} Events
        </span>

      </div>

      {

        dashboard.recent_events.length === 0 ? (

          <div className="text-center py-16 text-slate-500">

            <CalendarDays
              size={48}
              className="mx-auto mb-4 text-slate-300"
            />

            <p className="text-lg font-medium">
              No Upcoming Events
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {

              dashboard.recent_events.map((event) => (

                <div
                  key={event.id}
                  className="rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 p-5 group"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition">

                        {event.title}

                      </h3>

                      <div className="flex items-center gap-2 mt-3 text-slate-600">

                        <CalendarDays size={16} />

                        <span>

                          {new Date(
                            event.event_date
                          ).toLocaleDateString()}

                        </span>

                      </div>

                      <div className="flex items-center gap-2 mt-2 text-slate-600">

                        <MapPin size={16} />

                        <span>

                          {event.venue}

                        </span>

                      </div>

                    </div>

                    <div>

                      <button
                        className="bg-indigo-50 hover:bg-indigo-600 hover:text-white transition rounded-xl p-3"
                      >

                        <ArrowRight size={18} />

                      </button>

                    </div>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default UpcomingEventsTable;