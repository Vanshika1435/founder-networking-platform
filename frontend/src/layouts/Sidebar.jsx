import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  CalendarDays,
  Ticket,
  CreditCard,
  Newspaper,
  Image,
  ClipboardCheck,
  BarChart3,
  Building2,
} from "lucide-react";
const menuItems = [

  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Users",
    path: "/users",
    icon: UserCog,
  },

  {
    name: "Membership",
    path: "/membership",
    icon: Users,
  },

  {
    name: "Events",
    path: "/events",
    icon: CalendarDays,
  },
  {
    name: "Registrations",
    path: "/registrations",
    icon: ClipboardCheck,
  },
  {
    name: "Tickets",
    path: "/tickets",
    icon: Ticket,
  },

  {
    name: "Founder Directory",
    path: "/founders",
    icon: Building2,
  },

  {
    name: "Payments",
    path: "/payments",
    icon: CreditCard,
  },

  {
    name: "Blog",
    path: "/blog",
    icon: Newspaper,
  },

  {
    name: "Gallery",
    path: "/gallery",
    icon: Image,
  },

  {
    name: "Reports",
    path: "/reports",
    icon: BarChart3,
  },

];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white shadow-2xl">

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-2xl font-bold tracking-wide">
          Founder Hub
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Admin Panel
        </p>

      </div>

      <nav className="p-4 space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600 shadow-lg"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>

            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;