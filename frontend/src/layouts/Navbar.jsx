function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 h-20 flex justify-between items-center px-8">
      <h2 className="font-bold text-xl">
        Founder Networking Platform
      </h2>

      <div className="flex items-center gap-4">

        <img
          src="https://ui-avatars.com/api/?name=Admin"
          className="w-10 h-10 rounded-full"
        />

      </div>

    </header>
  );
}

export default Navbar;