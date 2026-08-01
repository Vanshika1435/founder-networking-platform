function Button({
  children,
  onClick,
  color = "indigo",
}) {

  const colors = {
    indigo:
      "bg-indigo-600 hover:bg-indigo-700",

    red:
      "bg-red-600 hover:bg-red-700",

    green:
      "bg-emerald-600 hover:bg-emerald-700",
  };

  return (

    <button
      onClick={onClick}
      className={`${colors[color]} text-white px-4 py-2 rounded-xl transition duration-200 font-medium`}
    >

      {children}

    </button>

  );
}

export default Button;