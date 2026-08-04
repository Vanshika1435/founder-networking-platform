import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import SearchBar from "../../components/ui/SearchBar";
import EmptyState from "../../components/ui/EmptyState";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";

import {
  getUsers,
  approveUser,
  rejectUser,
  suspendUser,
  activateUser,
} from "../../services/userService";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    setFiltered(
      users.filter((u) =>
        u.name.toLowerCase().includes(value) ||
        u.email.toLowerCase().includes(value) ||
        (u.company_name || "").toLowerCase().includes(value)
      )
    );
  }, [search, users]);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setFiltered(data);
    } finally {
      setLoading(false);
    }
  };
  const total = users.length;
 
  const approved = users.filter(
    (u) => u.approval_status === "Approved"
  ).length;

  const pending = users.filter(
    (u) => u.approval_status === "Pending"
  ).length;

  const suspended = users.filter(
    (u) => !u.is_active
  ).length;

  const approve = async (id) => {
    await approveUser(id);
    loadUsers();
  };

  const reject = async (id) => {
    await rejectUser(id);
    loadUsers();
  };

  const suspend = async (id) => {
    await suspendUser(id);
    loadUsers();
  };

  const activate = async (id) => {
    await activateUser(id);
    loadUsers();
  };

  const columns = [
    {
        key: "name",
        label: "Founder",
        render: (row) => (
        <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
            {row.name.charAt(0).toUpperCase()}
            </div>

            <div>
            <p className="font-semibold">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
            </div>
        </div>
        ),
    },

    {
        key: "company_name",
        label: "Company",
        render: (row) => (
        <div>
            <p className="font-medium">
            {row.company_name || "-"}
            </p>

            <p className="text-xs text-gray-500">
            {row.industry || "-"}
            </p>
        </div>
        ),
    },

    {
        key: "city",
        label: "City",
    },

    {
        key: "approval_status",
        label: "Approval",
        render: (row) => (
        <Badge status={row.approval_status} />
        ),
    },

    {
        key: "is_active",
        label: "Account",
        render: (row) => (
        <Badge
            status={
            row.is_active
                ? "Active"
                : "Suspended"
            }
        />
        ),
    },
    ];

  if (loading) return <Loader />;

  return (
    <Card title="Founder Management">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-6 shadow-lg">
          <p className="text-sm opacity-80">Total Founders</p>
          <h2 className="text-4xl font-bold mt-2">{total}</h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 shadow-lg">
          <p className="text-sm opacity-80">Approved</p>
          <h2 className="text-4xl font-bold mt-2">{approved}</h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 shadow-lg">
          <p className="text-sm opacity-80">Pending</p>
          <h2 className="text-4xl font-bold mt-2">{pending}</h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 shadow-lg">
          <p className="text-sm opacity-80">Suspended</p>
          <h2 className="text-4xl font-bold mt-2">{suspended}</h2>
        </div>

      </div>
      <div className="flex justify-between items-center mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState text="No Founders Found" />
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
            actions={(row) => (
                <div className="flex flex-wrap gap-2 justify-center">

                    <button
                    onClick={() => approve(row.id)}
                    className="rounded-xl bg-green-500 hover:bg-green-600 text-white px-4 py-2 transition-all duration-300"
                    >
                    Approve
                    </button>

                    <button
                    onClick={() => reject(row.id)}
                    className="rounded-xl bg-red-500 hover:bg-red-600 text-white px-4 py-2 transition-all duration-300"
                    >
                    Reject
                    </button>

                    {row.is_active ? (

                    <button
                    onClick={() => suspend(row.id)}
                    className="rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 transition-all duration-300"
                    >
                        Suspend
                    </button>

                    ) : (

                    <button
                        onClick={() => activate(row.id)}
                        className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition-all duration-300"
                    >
                        Activate
                    </button>

                    )}

                </div>
            )}
        />
      )}
    </Card>
  );
}

export default UserPage;