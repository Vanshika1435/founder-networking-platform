import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

function RevenueChart({ dashboard }) {

  const data = [
    {
      name: "Membership",
      amount: dashboard.membership_revenue,
      color: "#4F46E5",
    },
    {
      name: "Events",
      amount: dashboard.event_revenue,
      color: "#10B981",
    },
    {
      name: "Total",
      amount: dashboard.total_revenue,
      color: "#F59E0B",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-indigo-200 transition-all duration-300 p-6">
      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Revenue Overview
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Membership vs Event Revenue
          </p>

        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              radius={[12,12,0,0]}
              animationDuration={1500}
            >

              {data.map((entry,index)=>(

                <Cell
                  key={index}
                  fill={entry.color}
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default RevenueChart;