function DataTable({
  columns,
  data,
  actions,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left"
              >
                {column.label}
              </th>
            ))}

            {actions && (
              <th className="px-6 py-4">
                Actions
              </th>
            )}

          </tr>

        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr
              key={index}
              className="border-t hover:bg-slate-50"
            >

              {columns.map((column) => (

                <td
                  key={column.key}
                  className="px-6 py-4"
                >
                  {column.render
                    ? column.render(row)
                    : row[column.key]}
                </td>

              ))}

              {actions && (

                <td className="px-6 py-4">

                  {actions(row)}

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