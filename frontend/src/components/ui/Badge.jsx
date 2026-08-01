function Badge({ status }) {

  const styles = {

    Approved:
      "bg-green-100 text-green-700 border border-green-300",

    Pending:
      "bg-yellow-100 text-yellow-700 border border-yellow-300",

    Rejected:
      "bg-red-100 text-red-700 border border-red-300",

    Suspended:
      "bg-red-100 text-red-700 border border-red-300",

    Active:
      "bg-emerald-100 text-emerald-700 border border-emerald-300",

    Paid:
      "bg-indigo-100 text-indigo-700 border border-indigo-300",

  };

  return (

    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
        styles[status] ||
        "bg-gray-100 text-gray-700 border border-gray-300"
      }`}
    >
      {status}
    </span>

  );
}

export default Badge;