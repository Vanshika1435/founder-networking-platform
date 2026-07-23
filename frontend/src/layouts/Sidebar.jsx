import {
  LayoutDashboard,
  Users,
  CalendarDays,
  CreditCard,
  FileBarChart2,
  Image,
  Newspaper,
  UserCircle,
  Ticket,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const menu = [
  {
    icon: <LayoutDashboard size={20} />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <Users size={20} />,
    title: "Membership",
    path: "/membership",
  },
  {
    icon: <CalendarDays size={20} />,
    title: "Events",
    path: "/events",
  },
  {
    icon: <Ticket size={20} />,
    title: "Tickets",
    path: "/tickets",
  },
  {
    icon: <CreditCard size={20} />,
    title: "Payments",
    path: "/payments",
  },
  {
    icon: <UserCircle size={20} />,
    title: "Founders",
    path: "/founders",
  },
  {
    icon: <Newspaper size={20} />,
    title: "Blog",
    path: "/blog",
  },
  {
    icon: <Image size={20} />,
    title: "Gallery",
    path: "/gallery",
  },
  {
    icon: <FileBarChart2 size={20} />,
    title: "Reports",
    path: "/reports",
  },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 text-white shadow-2xl z-50">

      <div className="text-2xl font-bold p-8">
        FounderHub
      </div>

      <nav className="px-4">

        {menu.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition ${
              location.pathname === item.path
                ? "bg-indigo-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;