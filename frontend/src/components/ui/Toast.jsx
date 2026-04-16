import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  const styles = {
    success: "bg-white border-green-100 text-green-800 shadow-green-100/50",
    error: "bg-white border-red-100 text-red-800 shadow-red-100/50",
    info: "bg-white border-indigo-100 text-indigo-800 shadow-indigo-100/50"
  };

  const icons = {
    success: <CheckCircle className="text-green-500" size={18} />,
    error: <AlertCircle className="text-red-500" size={18} />,
    info: <CheckCircle className="text-indigo-500" size={18} />
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className={`
        pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg w-72
        ${styles[type]}
      `}
    >
      <div className="shrink-0">{icons[type]}</div>
      <p className="text-sm font-semibold flex-1 leading-tight">{message}</p>
      <button 
        onClick={onClose}
        className="shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-400"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

export default Toast;
