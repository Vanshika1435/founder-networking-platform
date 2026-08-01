import { useEffect, useState } from "react";
import { Search, Ticket, Download } from "lucide-react";
import TicketModal from "../../components/tickets/TicketModal";
import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import DataTable from "../../components/ui/DataTable";

import {
  getTickets,
  getTicket,
} from "../../services/ticketService";

function TicketsPage() {

  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  useEffect(() => {

    const value = search.toLowerCase();

    setFiltered(

      tickets.filter(

        ticket =>

          ticket.attendee_name.toLowerCase().includes(value) ||

          ticket.event_name.toLowerCase().includes(value) ||

          ticket.ticket_number.toLowerCase().includes(value)

      )

    );

  }, [search, tickets]);

  const loadTickets = async () => {

    try {

      const data = await getTickets();

      setTickets(data);

      setFiltered(data);

    }

    finally {

      setLoading(false);

    }

  };

  const downloadTicket = async (id) => {

    const ticket = await getTicket(id);

    setSelectedTicket(ticket);

    setModalOpen(true);

  };

  const columns = [

    {
      key: "ticket_number",
      label: "Ticket No",
    },

    {
      key: "attendee_name",
      label: "Attendee",
    },

    {
      key: "event_name",
      label: "Event",
    },

    {
      key: "venue",
      label: "Venue",
    },

    {
      key: "event_date",
      label: "Date",
    },

    {
      key: "attendance",
      label: "Attendance",
      render: (row) => (
        row.attendance
          ? <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">Checked In</span>
          : <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">Pending</span>
      )
    }

  ];
  if(loading){

    return <Loader/>

  }

  return (
    <>

<Card title="Ticket Management">

<div className="flex justify-between items-center mb-6">

<div className="relative w-80">

<Search
size={18}
className="absolute left-3 top-3 text-slate-400"
/>

<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search Ticket"

className="w-full border rounded-xl pl-10 pr-4 py-3"

/>

</div>

<div className="flex items-center gap-2 text-indigo-600 font-semibold">

<Ticket/>

{tickets.length} Tickets

</div>

</div>

{

filtered.length===0 ?

<EmptyState text="No Tickets Found"/>

:

<DataTable

columns={columns}

data={filtered}

actions={(row)=>(

<button

onClick={()=>downloadTicket(row.id)}

className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2 flex items-center gap-2"

>

<Download size={18}/>

View

</button>

)}

/>

}

</Card>
  
<TicketModal
  open={modalOpen}
  ticket={selectedTicket}
  onClose={() => {
    setModalOpen(false);
    setSelectedTicket(null);
  }}
/>
</>

  );

}

export default TicketsPage;