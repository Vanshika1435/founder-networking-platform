import { useEffect, useState } from "react";

import { getDashboard } from "../../services/dashboardService";

import StatCard from "../../components/dashboard/StatCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import RecentActivity from "../../components/dashboard/RecentActivity";

function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl mt-20">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Founder Networking Platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Members"
          value={dashboard.total_members}
          color="#4F46E5"
        />

        <StatCard
          title="Approved Members"
          value={dashboard.approved_members}
          color="#10B981"
        />

        <StatCard
          title="Pending Members"
          value={dashboard.pending_members}
          color="#F59E0B"
        />

        <StatCard
          title="Upcoming Events"
          value={dashboard.upcoming_events}
          color="#EF4444"
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <RecentActivity />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          title="Event Registrations"
          value={dashboard.total_event_registrations}
          color="#06B6D4"
        />

        <StatCard
          title="Membership Revenue"
          value={`₹${dashboard.membership_revenue}`}
          color="#8B5CF6"
        />

        <StatCard
          title="Total Revenue"
          value={`₹${dashboard.total_revenue}`}
          color="#22C55E"
        />

      </div>

    </div>
  );
}

export default DashboardPage;