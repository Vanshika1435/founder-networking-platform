function TicketModal({ open, ticket, onClose }) {

  if (!open || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold mb-6">
          Event Ticket
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <p className="text-gray-400 text-sm">Ticket Number</p>
            <p className="font-semibold">{ticket.ticket_number}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Attendee</p>
            <p className="font-semibold">{ticket.attendee_name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Event</p>
            <p className="font-semibold">{ticket.event_name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Venue</p>
            <p className="font-semibold">{ticket.venue}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Date</p>
            <p>{ticket.event_date}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Time</p>
            <p>{ticket.event_time}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Attendance</p>

            <span
              className={`px-3 py-1 rounded-full ${
                ticket.attendance
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {ticket.attendance ? "Checked In" : "Pending"}
            </span>

          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default TicketModal;