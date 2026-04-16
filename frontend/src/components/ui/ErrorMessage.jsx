import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3"
    >
      <AlertCircle size={20} className="shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
};

export default ErrorMessage;
