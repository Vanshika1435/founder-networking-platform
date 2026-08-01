import { motion } from "framer-motion";

function Card({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 p-7"
    >
      {title && (
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-3xl font-bold text-slate-800">
            {title}
          </h2>

          <p className="text-slate-500 mt-1">
            Manage your founder community
          </p>
        </div>
      )}

      {children}
    </motion.div>
  );
}

export default Card;