function StatBox({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 border">
      <p
        className="text-sm font-medium"
        style={{ color }}
      >
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}

export default StatBox;