import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProfileDropdown = ({ user }) => {
  const { logout } = useAuth();
  if (!user) return null;

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 origin-top-right"
    >
      <div className="p-5 bg-gradient-to-br from-indigo-50/50 to-white border-b border-gray-100">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-indigo-100 flex items-center justify-center text-indigo-600">
            <User size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
            <Mail size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
            <p className="text-sm font-medium truncate">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
            <Calendar size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Joined</p>
            <p className="text-sm font-medium">{formatDate(user.dateOfJoining)}</p>
          </div>
        </div>
      </div>

      <div className="p-2 bg-gray-50">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileDropdown;
