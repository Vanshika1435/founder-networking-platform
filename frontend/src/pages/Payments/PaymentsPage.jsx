import { useEffect, useMemo, useState } from "react";

import {
  IndianRupee,
  Search,
  CreditCard,
  CheckCircle2,
  Clock3,
  XCircle,
  Eye,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import DataTable from "../../components/ui/DataTable";
import PaymentModal from "../../components/payments/PaymentModal";
import {
  getPayments,
  getPayment,
} from "../../services/paymentService";

function PaymentsPage() {

  const [payments,setPayments]=useState([]);
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  useEffect(()=>{

    loadPayments();

  },[]);

  const loadPayments=async()=>{

    try{

      const data=await getPayments();

      setPayments(data);

    }

    finally{

      setLoading(false);

    }

  };

  const filtered=useMemo(()=>{

    return payments.filter((p)=>

      (p.transaction_id || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (p.payment_method || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (p.payment_type || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  },[payments,search]);

  const totalRevenue=payments.reduce(

    (sum,p)=>sum+p.amount,

    0

  );

  const success=payments.filter(

    p=>p.payment_status==="Success"

  ).length;

  const pending=payments.filter(

    p=>p.payment_status==="Pending"

  ).length;

  const failed=payments.filter(

    p=>p.payment_status==="Failed"

  ).length;

  const viewPayment = async (id) => {

    const payment = await getPayment(id);

    setSelectedPayment(payment);

    setModalOpen(true);

  };
  const columns=[

    {
      key:"transaction_id",
      label:"Transaction ID"
    },

    {
      key:"payment_type",
      label:"Type"
    },

    {
      key:"payment_method",
      label:"Method"
    },

    {
      key:"amount",
      label:"Amount",
      render: (row) => `₹${Number(row.amount).toLocaleString()}`
    },

    {
      key:"payment_status",
      label:"Status",

      render:(row)=>(

        <span className={`px-3 py-1 rounded-full text-xs font-semibold

        ${
          row.payment_status==="Success"
          ?"bg-green-100 text-green-700"
          :row.payment_status==="Pending"
          ?"bg-yellow-100 text-yellow-700"
          :"bg-red-100 text-red-700"
        }`}>

          {row.payment_status}

        </span>

      )

    }

  ];

  if(loading){

    return <Loader/>

  }

  return(
<>
<div className="space-y-6">

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

<div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-3xl text-white p-6">

<div className="flex justify-between">

<div>

<p>Total Revenue</p>

<h2 className="text-3xl font-bold mt-3">

₹{totalRevenue.toLocaleString()}

</h2>

</div>

<IndianRupee/>

</div>

</div>

<div className="bg-white rounded-3xl shadow-sm p-6">

<div className="flex justify-between">

<div>

<p>Successful</p>

<h2 className="text-3xl font-bold mt-3">

{success}

</h2>

</div>

<CheckCircle2 className="text-green-600"/>

</div>

</div>

<div className="bg-white rounded-3xl shadow-sm p-6">

<div className="flex justify-between">

<div>

<p>Pending</p>

<h2 className="text-3xl font-bold mt-3">

{pending}

</h2>

</div>

<Clock3 className="text-yellow-500"/>

</div>

</div>

<div className="bg-white rounded-3xl shadow-sm p-6">

<div className="flex justify-between">

<div>

<p>Failed</p>

<h2 className="text-3xl font-bold mt-3">

{failed}

</h2>

</div>

<XCircle className="text-red-500"/>

</div>

</div>

</div>

<Card title="Payment Management">

<div className="flex justify-between items-center mb-6">

<div className="relative w-80">

<Search
size={18}
className="absolute left-3 top-3 text-slate-400"
/>

<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search Transaction ID, Method or Type..."

className="border rounded-xl pl-10 pr-4 py-3 w-full"

/>

</div>

<div className="flex items-center gap-2 text-indigo-600 font-semibold">

<CreditCard/>

{payments.length} Payments

</div>

</div>

{

filtered.length===0 ?

<EmptyState text="No Payments Found"/>

:

<DataTable

columns={columns}

data={filtered}

actions={(row)=>

<button

onClick={()=>viewPayment(row.id)}

className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2 flex items-center gap-2"

>

<Eye size={18}/>

Details

</button>

}

/>

}

</Card>

<PaymentModal
  open={modalOpen}
  payment={selectedPayment}
  onClose={() => {
    setModalOpen(false);
    setSelectedPayment(null);
  }}
/>

</div>

</>

);

}

export default PaymentsPage;