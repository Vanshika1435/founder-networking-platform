import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", revenue: 25000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 39000 },
  { month: "Apr", revenue: 51000 },
  { month: "May", revenue: 67000 },
  { month: "Jun", revenue: 85000 },
];

function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[380px]">
      <h2 className="font-bold text-xl mb-5">
        Revenue Overview
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4F46E5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;