function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder="Search..."
      className="w-full md:w-80 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
}

export default SearchBar;