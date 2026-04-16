import { motion } from 'framer-motion';

const StatsCard = ({ label, value, icon: Icon, color = "indigo" }) => {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    green: "bg-green-50 text-green-600 border-green-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <motion.div 
      whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 transition-shadow"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatsCard;
