function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4" style={{ borderColor: color }}>
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;