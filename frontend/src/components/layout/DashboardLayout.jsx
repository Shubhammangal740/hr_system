import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { LayoutDashboard, Calendar, ClipboardCheck, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth();
    const location = useLocation();

    const menuItems = user?.role === 'admin' 
        ? [
            { icon: LayoutDashboard, label: 'Overview', path: '/admin-dashboard' },
            { icon: Users, label: 'Employees', path: '/admin-dashboard/users' },
            { icon: Calendar, label: 'Leave Requests', path: '/admin-dashboard/leaves' },
            { icon: ClipboardCheck, label: 'Attendance', path: '/admin-dashboard/attendance' },
          ]
        : [
            { icon: LayoutDashboard, label: 'Dashboard', path: '/employee-dashboard' },
            { icon: Calendar, label: 'My Leaves', path: '/employee-dashboard/leaves' },
            { icon: ClipboardCheck, label: 'My Attendance', path: '/employee-dashboard/attendance' },
          ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar 
                onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            />
            
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Overlay */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`
                    fixed lg:sticky top-16 lg:top-0 h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-200 
                    z-50 transition-transform duration-300 lg:translate-x-0
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="p-4 flex flex-col gap-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                                    ${location.pathname === item.path 
                                        ? 'bg-indigo-50 text-indigo-600' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                `}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
