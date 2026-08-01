import {
  Users,
  CreditCard,
  CalendarDays,
  BadgeIndianRupee,
} from "lucide-react";

function ActivityItem({ icon, title, value, color }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-slate-500 text-sm">{title}</p>

        <h3 className="font-bold text-xl">
          {value}
        </h3>
      </div>
    </div>
  );
}

function RecentActivity({ dashboard }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Platform Summary
      </h2>

      <div className="space-y-4">

        <ActivityItem
          title="Members"
          value={dashboard.total_members}
          color="#4F46E5"
          icon={<Users size={22} />}
        />

        <ActivityItem
          title="Upcoming Events"
          value={dashboard.upcoming_events}
          color="#10B981"
          icon={<CalendarDays size={22} />}
        />

        <ActivityItem
          title="Registrations"
          value={dashboard.total_event_registrations}
          color="#0EA5E9"
          icon={<Users size={22} />}
        />

        <ActivityItem
          title="Revenue"
          value={`₹${dashboard.total_revenue}`}
          color="#F59E0B"
          icon={<BadgeIndianRupee size={22} />}
        />

        <ActivityItem
          title="Payments"
          value={dashboard.recent_payments.length}
          color="#EC4899"
          icon={<CreditCard size={22} />}
        />

      </div>
    </div>
  );
}

export default RecentActivity;