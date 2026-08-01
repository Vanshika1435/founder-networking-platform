import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpcomingEventsTable from "../../components/dashboard/UpcomingEventsTable";
import { getDashboard } from "../../services/dashboardService";
import RecentMembersTable from "../../components/dashboard/RecentMembersTable";
import RecentPaymentsTable from "../../components/dashboard/RecentPaymentsTable";
import StatCard from "../../components/dashboard/StatCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import RecentActivity from "../../components/dashboard/RecentActivity";

import {
  Users,
  UserCheck,
  UserX,
  Clock3,
  CalendarDays,
  Wallet,
  IndianRupee,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

function DashboardPage() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const data = await getDashboard();

      setDashboard(data);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[80vh]">

        <div className="h-14 w-14 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>

      </div>

    );

  }

  return (

    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-50 p-2 rounded-3xl">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">

          Founder Community Dashboard

          </h1>
          <p className="text-slate-500 mt-2">

          Monitor memberships, events and payments in real time.

          </p>

        </div>

        <button

          onClick={() => navigate("/reports")}

          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl transition"

        >

          View Reports

          <ArrowRight size={18} />

        </button>

      </div>

      {/* Alerts */}

      {(dashboard.pending_members > 0 ||

        dashboard.renewals_due > 0) && (

        <div className="grid md:grid-cols-2 gap-5">

          {

            dashboard.pending_members > 0 && (

              <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-5">

                <div className="flex items-center gap-3">

                  <AlertTriangle

                    className="text-yellow-600"

                  />

                  <div>

                    <h3 className="font-bold">

                      Pending Membership Approvals

                    </h3>

                    <p className="text-sm text-slate-600">

                      {dashboard.pending_members} members are waiting for approval.

                    </p>

                  </div>

                </div>

              </div>

            )

          }

          {

            dashboard.renewals_due > 0 && (

              <div className="rounded-2xl border border-red-300 bg-red-50 p-5">

                <div className="flex items-center gap-3">

                  <Clock3

                    className="text-red-600"

                  />

                  <div>

                    <h3 className="font-bold">

                      Membership Renewals Due

                    </h3>

                    <p className="text-sm text-slate-600">

                      {dashboard.renewals_due} memberships expire within 30 days.

                    </p>

                  </div>

                </div>

              </div>

            )

          }

        </div>

      )}

      {/* Top Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard

          title="Total Members"

          value={dashboard.total_members}

          color="#4F46E5"

          icon={<Users size={26} />}

        />

        <StatCard

          title="Approved Members"

          value={dashboard.approved_members}

          color="#10B981"

          icon={<UserCheck size={26} />}

        />

        <StatCard

          title="Pending Approvals"

          value={dashboard.pending_members}

          color="#F59E0B"

          icon={<Clock3 size={26} />}

        />

        <StatCard

          title="Suspended Members"

          value={dashboard.suspended_members}

          color="#EF4444"

          icon={<UserX size={26} />}

        />

      </div>

      {/* Membership Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard

          title="Active Memberships"

          value={dashboard.active_memberships}

          color="#22C55E"

          icon={<ShieldCheck size={26} />}

        />

        <StatCard

          title="Expired Memberships"

          value={dashboard.expired_memberships}

          color="#DC2626"

          icon={<Clock3 size={26} />}

        />

        <StatCard

          title="Renewals Due"

          value={dashboard.renewals_due}

          color="#F97316"

          icon={<IndianRupee size={26} />}
        />

        <StatCard

          title="Upcoming Events"

          value={dashboard.upcoming_events}

          color="#0EA5E9"

          icon={<CalendarDays size={26} />}

        />

      </div>

      {/* Revenue + Activity */}

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">

          <RevenueChart dashboard={dashboard} />

        </div>

        <RecentActivity dashboard={dashboard} />

      </div>

      {/* Revenue Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        <StatCard

          title="Registrations"

          value={dashboard.total_event_registrations}

          color="#2563EB"

          icon={<Users size={26} />}

        />

        <StatCard
          title="Membership Revenue"
          value={dashboard.membership_revenue}
          color="#7C3AED"
          isCurrency={true}
          icon={<Wallet size={26} />}
        />

        <StatCard
          title="Event Revenue"
          value={dashboard.event_revenue}
          color="#EC4899"
          isCurrency={true}
          icon={<CreditCard size={26} />}
        />

        <StatCard
          title="Total Revenue"
          value={dashboard.total_revenue}
          color="#16A34A"
          isCurrency={true}
          icon={<IndianRupee size={26} />}
        />
      </div>

      {/* Quick Actions */}

      <div className="rounded-3xl bg-white shadow-sm border border-slate-200 p-8">

        <h2 className="text-2xl font-bold mb-8">

          Quick Actions

        </h2>

        <div className="grid md:grid-cols-4 gap-5">

          <button
            onClick={() => navigate("/members")}
            className="rounded-2xl border bg-white p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <Users className="mx-auto mb-3 text-indigo-600" />
            Members
          </button>

          <button
            onClick={() => navigate("/events")}
            className="rounded-2xl border bg-white p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <CalendarDays className="mx-auto mb-3 text-green-600" />
            Events
          </button>

          <button
            onClick={() => navigate("/payments")}
            className="rounded-2xl border bg-white p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <CreditCard className="mx-auto mb-3 text-orange-600" />
            Payments
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="rounded-2xl border bg-white p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <ArrowRight className="mx-auto mb-3 text-purple-600" />
            Reports
          </button>

        </div>

      </div>
      <div className="grid xl:grid-cols-2 gap-6">

        <RecentMembersTable dashboard={dashboard} />

        <RecentPaymentsTable dashboard={dashboard} />
        <UpcomingEventsTable dashboard={dashboard} />
      </div>
    </div>

  );

}

export default DashboardPage;