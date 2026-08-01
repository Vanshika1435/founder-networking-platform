import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";

import StatBox from "../../components/reports/StatBox";

import {
  getMembershipReport,
  getEventReport,
  getPaymentReport,
} from "../../services/reportService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function ReportsPage() {

  const [loading, setLoading] = useState(true);

  const [memberships, setMemberships] = useState([]);

  const [events, setEvents] = useState([]);

  const [payments, setPayments] = useState([]);

  useEffect(() => {

    loadReports();

  }, []);

  const loadReports = async () => {

    try {

      const membershipData =
        await getMembershipReport();

      const eventData =
        await getEventReport();

      const paymentData =
        await getPaymentReport();

      setMemberships(membershipData);

      setEvents(eventData);

      setPayments(paymentData);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) return <Loader />;

  const totalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const paidPayments = payments.filter(
    (item) => item.payment_status === "Success"
  ).length;

  const chartColors = [
    "#4F46E5",
    "#14B8A6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#0EA5E9",
  ];

  return (

    <div className="space-y-8">

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatBox
          title="Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          color="#4F46E5"
        />

        <StatBox
          title="Members"
          value={memberships.length}
          color="#0EA5E9"
        />

        <StatBox
          title="Events"
          value={events.length}
          color="#10B981"
        />

        <StatBox
          title="Successful Payments"
          value={paidPayments}
          color="#F59E0B"
        />

      </div>

      <div className="grid xl:grid-cols-2 gap-8">

        <Card title="Event Registrations">

          <div className="h-96">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={events}>

                <XAxis
                    dataKey="event_name"
                    tick={{fontSize:12}}
                />

                <YAxis />

                <Tooltip
                    cursor={{fill:"#EEF2FF"}}
                />

                <Bar
                  dataKey="registrations"
                  fill="#4F46E5"
                  radius={[8,8,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>

        <Card title="Payment Distribution">

          <div className="h-96">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={payments}
                  dataKey="amount"
                  nameKey="payment_type"
                  outerRadius={130}
                  label={({payment_type})=>payment_type}
                >

                  {

                    payments.map((entry,index)=>(

                      <Cell
                        key={index}
                        fill={
                          chartColors[
                            index % chartColors.length
                          ]
                        }
                      />

                    ))

                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </div>

      <Card title="Membership Report">

        <div className="overflow-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left p-4">
                  Member
                </th>

                <th className="text-left p-4">
                  Plan
                </th>

                <th className="text-left p-4">
                  Payment
                </th>

                <th className="text-left p-4">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {

                memberships.map((item,index)=>(

                  <tr
                    key={index}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">

                      {item.member_name}

                    </td>

                    <td className="p-4">

                      {item.plan}

                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold

                        ${
                        item.payment_status==="Success"
                        ?"bg-green-100 text-green-700"

                        :item.payment_status==="Pending"

                        ?"bg-yellow-100 text-yellow-700"

                        :"bg-red-100 text-red-700"

                        }`}

                        >

                        {item.payment_status}

                      </span>

                    </td>

                    <td className="p-4">

                      ₹{Number(item.amount).toLocaleString()}

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </Card>

    </div>

  );

}

export default ReportsPage;