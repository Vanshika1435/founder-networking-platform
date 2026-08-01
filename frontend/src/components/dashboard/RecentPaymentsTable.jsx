function RecentPaymentsTable({ dashboard }) {

  return (

    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Recent Payments

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b text-left text-slate-500">

              <th className="py-3">Transaction</th>

              <th>Amount</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {dashboard.recent_payments.length === 0 ? (

              <tr>

                <td
                  colSpan={3}
                  className="text-center py-8 text-gray-500"
                >

                  No Payments

                </td>

              </tr>

            ) : (

              dashboard.recent_payments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">

                    {payment.transaction_id}

                  </td>

                  <td>

                    <span className="font-bold text-indigo-600">
                      ₹{payment.amount}
                    </span>

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.payment_status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {payment.payment_status}
                      </span>

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

export default RecentPaymentsTable;