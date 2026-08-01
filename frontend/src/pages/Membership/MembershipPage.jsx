import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import SearchBar from "../../components/ui/SearchBar";
import Badge from "../../components/ui/Badge";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";

import MembershipModal from "../../components/membership/MembershipModal";
import DeleteDialog from "../../components/ui/DeleteDialog";

import {
    getMemberships,
    renewMembership,
    createMembership,
    updateMembership,
    deleteMembership,
    approveMembership,
    rejectMembership,
    suspendMembership,
    activateMembership,
} from "../../services/membershipService";

import {
    Pencil,
    Trash2,
    Plus,
    RotateCcw,
} from "lucide-react";

function MembershipPage() {

    const [memberships,setMemberships]=useState([]);
    const [filtered,setFiltered]=useState([]);

    const [loading,setLoading]=useState(true);

    const [search,setSearch]=useState("");

    const [open,setOpen]=useState(false);

    const [editing,setEditing]=useState(null);

    const [deleteOpen,setDeleteOpen]=useState(false);

    const [selectedId,setSelectedId]=useState(null);

    useEffect(()=>{
        loadMemberships();
    },[]);

    useEffect(()=>{

        const value=search.toLowerCase();

        setFiltered(

            memberships.filter((m)=>

                m.member_name.toLowerCase().includes(value) ||

                m.email.toLowerCase().includes(value) ||

                m.plan_name.toLowerCase().includes(value)

            )

        );

    },[search,memberships]);



    const loadMemberships=async()=>{

        try{

            const data=await getMemberships();

            setMemberships(data);

            setFiltered(data);

        }

        finally{

            setLoading(false);

        }

    };



    const saveMembership=async(data)=>{

        try{

            if(editing){

                await updateMembership(editing.id,data);

            }

            else{

                await createMembership(data);

            }

            setOpen(false);

            setEditing(null);

            loadMemberships();

        }

        catch(err){

            console.log(err);

        }

    };



    const renew=async(id)=>{

        await renewMembership(id);

        loadMemberships();

    };
    const approve = async (id) => {
        await approveMembership(id);
        loadMemberships();
    };

    const reject = async (id) => {
        await rejectMembership(id);
        loadMemberships();
    };

    const suspend = async (id) => {
        await suspendMembership(id);
        loadMemberships();
    };

    const activate = async (id) => {
        await activateMembership(id);
        loadMemberships();
    };


    const remove=async()=>{

        await deleteMembership(selectedId);

        setDeleteOpen(false);

        loadMemberships();

    };



    const columns=[

        {
            key:"member_name",
            label:"Member"
        },

        {
            key:"email",
            label:"Email"
        },

        {
            key:"plan_name",
            label:"Plan"
        },

        {
            key:"status",
            label:"Status",
            render:(row)=><Badge status={row.status}/>
        },

        {
            key:"payment_status",
            label:"Payment",
            render:(row)=><Badge status={row.payment_status}/>
        },

        {
            key:"expiry_date",
            label:"Expiry"
        }

    ];



    if(loading){

        return <Loader/>

    }

    return(

        <>

        <Card title="Membership Management">

            <div className="flex justify-between items-center mb-6">

                <SearchBar

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

                <Button

                    onClick={()=>{

                        setEditing(null);

                        setOpen(true);

                    }}

                >

                    <Plus size={18}/>

                    Add Membership

                </Button>

            </div>

            {

                filtered.length===0 ?

                (

                    <EmptyState

                        text="No Memberships Found"

                    />

                )

                :

                (

                    <DataTable

                        columns={columns}

                        data={filtered}

                        actions={(row) => (

                            <div className="flex flex-wrap gap-2">

                                <button
                                    onClick={() => approve(row.id)}
                                    className="px-3 py-1 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 text-sm"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() => reject(row.id)}
                                    className="px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-sm"
                                >
                                    Reject
                                </button>

                                <button
                                    onClick={() => suspend(row.id)}
                                    className="px-3 py-1 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-sm"
                                >
                                    Suspend
                                </button>

                                <button
                                    onClick={() => activate(row.id)}
                                    className="px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm"
                                >
                                    Activate
                                </button>

                                <button
                                    onClick={() => renew(row.id)}
                                    className="p-2 rounded-lg bg-green-100 hover:bg-green-200"
                                >
                                    <RotateCcw size={18} />
                                </button>

                                <button
                                    onClick={() => {
                                        setEditing(row);
                                        setOpen(true);
                                    }}
                                    className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200"
                                >
                                    <Pencil size={18} />
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedId(row.id);
                                        setDeleteOpen(true);
                                    }}
                                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                                >
                                    <Trash2 size={18} />
                                </button>

                            </div>

                        )}
                    />

                )

            }

        </Card>

        <MembershipModal

            open={open}

            membership={editing}

            onClose={()=>{

                setOpen(false);

                setEditing(null);

            }}

            onSave={saveMembership}

        />

        <DeleteDialog

            open={deleteOpen}

            onClose={()=>setDeleteOpen(false)}

            onDelete={remove}

        />

        </>

    );

}

export default MembershipPage;