import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import SearchBar from "../../components/ui/SearchBar";
import EmptyState from "../../components/ui/EmptyState";

import RegistrationModal from "../../components/registrations/RegistrationModal";

import { getUsers } from "../../services/userService";
import { getEvents } from "../../services/eventService";
import { registerEvent } from "../../services/registrationService";

import { Plus } from "lucide-react";

function EventRegistrationsPage() {

    const [users,setUsers]=useState([]);
    const [events,setEvents]=useState([]);

    const [loading,setLoading]=useState(true);

    const [search,setSearch]=useState("");

    const [open,setOpen]=useState(false);

    const [result,setResult]=useState(null);

    useEffect(()=>{

        loadData();

    },[]);

    const loadData=async()=>{

        try{

            const userData=await getUsers();

            const eventData=await getEvents();

            setUsers(userData);

            setEvents(eventData);

        }

        finally{

            setLoading(false);

        }

    };

    const saveRegistration=async(data)=>{

        try{

            const res=await registerEvent(data);

            setResult(res);

            setOpen(false);

        }

        catch(err){

            alert(

                err.response?.data?.detail ||

                "Registration Failed"

            );

        }

    };

    if(loading){

        return <Loader/>

    }

    return(

        <>

        <Card title="Event Registration">

            <div className="flex justify-between items-center mb-6">

                <SearchBar

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

                <button

                    onClick={()=>setOpen(true)}

                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"

                >

                    <Plus size={18}/>

                    Register Member

                </button>

            </div>

            {

                result ?

                (

                    <div className="rounded-2xl border border-green-200 bg-green-50 p-8">

                        <h2 className="text-2xl font-bold text-green-700">

                            Registration Successful 🎉

                        </h2>

                        <div className="mt-6 space-y-4">

                            <p>

                                <b>Member :</b>

                                {" "}

                                {result.user}

                            </p>

                            <p>

                                <b>Event :</b>

                                {" "}

                                {result.event}

                            </p>

                            <p>

                                <b>Ticket Number :</b>

                                {" "}

                                {result.ticket_number}

                            </p>

                            <p>

                                <b>QR Code :</b>

                                {" "}

                                {result.qr_code}

                            </p>

                            <p>

                                <b>PDF Ticket :</b>

                                {" "}

                                {result.pdf_ticket}

                            </p>

                        </div>

                    </div>

                )

                :

                (

                    <EmptyState

                        text="No Registration Yet"

                    />

                )

            }

        </Card>

        <RegistrationModal

            open={open}

            users={users.filter(

                u=>u.approval_status==="Approved"

            )}

            events={events}

            onClose={()=>setOpen(false)}

            onSave={saveRegistration}

        />

        </>

    );

}

export default EventRegistrationsPage;