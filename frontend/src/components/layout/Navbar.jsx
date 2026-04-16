import { useState } from 'react';
import { LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown';

const Navbar = ({ onMenuClick }) => {
    const { user } = useAuth();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onMenuClick}
                    className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                >
                    <Menu size={20} />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                        H
                    </div>
                    <span className="font-bold text-gray-900 hidden sm:block">HR System</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
                    <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                </div>
                
                <div 
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-colors"
                    >
                        <User size={20} />
                    </motion.div>

                    <AnimatePresence>
                        {isHovered && <ProfileDropdown user={user} />}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
