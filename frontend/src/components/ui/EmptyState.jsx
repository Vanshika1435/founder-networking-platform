function EmptyState({ text = "No Data Found" }) {
  return (
    <div className="text-center py-12 text-gray-500">
      <h2 className="text-xl font-semibold">
        {text}
      </h2>
    </div>
  );
}

export default EmptyState;