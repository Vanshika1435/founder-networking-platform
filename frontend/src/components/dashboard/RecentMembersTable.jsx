function RecentMembersTable({ dashboard }) {

  return (

    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Recent Members

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b text-left text-slate-500">

              <th className="py-3">Name</th>

              <th>Email</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {dashboard.recent_members.length === 0 ? (

              <tr>

                <td
                  colSpan={3}
                  className="text-center py-8 text-gray-500"
                >

                  No Members Found

                </td>

              </tr>

            ) : (

              dashboard.recent_members.map((member) => (

                <tr
                  key={member.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4 font-semibold">

                    {member.name}

                  </td>

                  <td>

                    {member.email}

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        member.approval_status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {member.approval_status}

                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default RecentMembersTable;