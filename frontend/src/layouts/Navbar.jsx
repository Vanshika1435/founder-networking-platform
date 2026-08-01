import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white h-20 px-8 flex items-center justify-between shadow-sm">

      <div>

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome Back 👋
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-xl border outline-none w-64"
          />

        </div>

        <button className="relative p-3 rounded-xl bg-slate-100 hover:bg-slate-200">

          <Bell size={20} />

          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>

        </button>

        <div className="text-right">

          <h2 className="font-semibold">
            Admin
          </h2>

          <p className="text-xs text-gray-500">
            Founder Network
          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;