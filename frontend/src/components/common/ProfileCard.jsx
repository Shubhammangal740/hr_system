import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const ProfileCard = ({ user, loading }) => {
  if (loading) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-20 bg-gray-100 rounded-xl mb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 shrink-0">
          <User size={32} />
        </div>
        
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</p>
            <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 text-gray-400">
              <Mail size={14} />
              <p className="text-xs font-bold uppercase tracking-wider">Email Address</p>
            </div>
            <p className="text-sm font-semibold text-gray-700 truncate">{user.email}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield size={14} />
              <p className="text-xs font-bold uppercase tracking-wider">Position</p>
            </div>
            <p className="text-sm font-semibold text-gray-700 capitalize">{user.role}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={14} />
              <p className="text-xs font-bold uppercase tracking-wider">Member Since</p>
            </div>
            <p className="text-sm font-semibold text-gray-700">{formatDate(user.dateOfJoining)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
