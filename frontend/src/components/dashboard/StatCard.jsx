import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon,
  color,
  isCurrency = false,
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6"
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2
            className="text-4xl font-bold mt-3"
            style={{ color }}
          >
            {isCurrency ? "₹" : ""}
            {value}
          </h2>

        </div>

        <div
          className="h-14 w-14 rounded-2xl flex items-center justify-center text-white"
          style={{ background: color }}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}

export default StatCard;