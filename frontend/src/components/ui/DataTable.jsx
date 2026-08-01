function DataTable({
  columns,
  data,
  actions,
}) {

  return (

    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">

      <table className="min-w-full">

        <thead>

          <tr className="bg-slate-50">

            {columns.map((column) => (

              <th
                key={column.key}
                className="px-6 py-5 text-left text-sm font-bold text-slate-600 uppercase tracking-wide"
              >
                {column.label}
              </th>

            ))}

            {actions && (

              <th className="px-6 py-5 text-center text-sm font-bold text-slate-600 uppercase">

                Actions

              </th>

            )}

          </tr>

        </thead>

        <tbody>

          {data.map((row) => (

            <tr
              key={row.id}
              className="
              border-t
              hover:bg-indigo-50
              transition-all
              duration-300
              "
            >

              {columns.map((column) => (

                <td
                  key={column.key}
                  className="px-6 py-5 text-slate-700"
                >

                  {column.render
                    ? column.render(row)
                    : row[column.key]}

                </td>

              ))}

              {actions && (

                <td className="px-6 py-5">

                  <div className="flex flex-wrap gap-2 justify-center">

                    {actions(row)}

                  </div>

                </td>

              )}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default DataTable;