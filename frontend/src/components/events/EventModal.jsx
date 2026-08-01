import { useEffect, useState } from "react";

function EventModal({
  open,
 event,
  onClose,
  onSave,
}) {

  const [form,setForm]=useState({
    title:"",
    description:"",
    speaker:"",
    venue:"",
    event_date:"",
    event_time:"",
    capacity:"",
    ticket_price:"",
  });

  useEffect(()=>{

    if(event){

      setForm({
        title:event.title || "",
        description:event.description || "",
        speaker:event.speaker || "",
        venue:event.venue || "",
        event_date:event.event_date || "",
        event_time:event.event_time || "",
        capacity:event.capacity || "",
        ticket_price:event.ticket_price || "",
      });

    }

    else{

      setForm({
        title:"",
        description:"",
        speaker:"",
        venue:"",
        event_date:"",
        event_time:"",
        capacity:"",
        ticket_price:"",
      });

    }

  },[event]);

  if(!open) return null;

  return(

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">

        <h2 className="text-2xl font-bold mb-6">

          {event ? "Edit Event" : "Create Event"}

        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            className="border rounded-xl p-3"
            placeholder="Title"
            value={form.title}
            onChange={(e)=>setForm({...form,title:e.target.value})}
          />

          <input
            className="border rounded-xl p-3"
            placeholder="Speaker"
            value={form.speaker}
            onChange={(e)=>setForm({...form,speaker:e.target.value})}
          />

          <input
            className="border rounded-xl p-3"
            placeholder="Venue"
            value={form.venue}
            onChange={(e)=>setForm({...form,venue:e.target.value})}
          />

          <input
            type="date"
            className="border rounded-xl p-3"
            value={form.event_date}
            onChange={(e)=>setForm({...form,event_date:e.target.value})}
          />

          <input
            type="time"
            className="border rounded-xl p-3"
            value={form.event_time}
            onChange={(e)=>setForm({...form,event_time:e.target.value})}
          />

          <input
            type="number"
            className="border rounded-xl p-3"
            placeholder="Capacity"
            value={form.capacity}
            onChange={(e)=>setForm({...form,capacity:e.target.value})}
          />

          <input
            type="number"
            className="border rounded-xl p-3 col-span-2"
            placeholder="Ticket Price"
            value={form.ticket_price}
            onChange={(e)=>setForm({...form,ticket_price:e.target.value})}
          />

        </div>

        <textarea

          className="border rounded-xl p-3 mt-4 w-full h-28"

          placeholder="Description"

          value={form.description}

          onChange={(e)=>setForm({
            ...form,
            description:e.target.value
          })}

        />

        <div className="flex justify-end gap-3 mt-6">

          <button

            onClick={onClose}

            className="px-5 py-2 rounded-xl bg-gray-200"

          >

            Cancel

          </button>

          <button

            onClick={()=>onSave(form)}

            className="px-5 py-2 rounded-xl bg-indigo-600 text-white"

          >

            Save Event

          </button>

        </div>

      </div>

    </div>

  );

}

export default EventModal;