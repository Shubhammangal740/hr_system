import { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { useLeave } from '../../hooks/useLeave';
import { useAttendance } from '../../hooks/useAttendance';
import { useAuth } from '../../hooks/useAuth';
import StatsCard from '../../components/common/StatsCard';
import UserTable from '../../components/admin/UserTable';
import LeaveTable from '../../components/leave/LeaveTable';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import { Users, Calendar, ClipboardCheck, ChevronRight } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, fetchProfile } = useAuth();
  const { getAllUsers, loading: usersLoading } = useAdmin();
  const { getAllLeaves, updateLeaveStatus, loading: leaveLoading } = useLeave();
  const { getAllAttendance, loading: attendanceLoading } = useAttendance();
  const { showNotification } = useNotification();

  const [users, setUsers] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const [u, l, a] = await Promise.all([
        getAllUsers(),
        getAllLeaves(),
        getAllAttendance()
      ]);
      setUsers(u);
      setLeaves(l);
      setAttendance(a);
    } catch (err) {
      showNotification('Failed to load admin data', 'error');
    }
  }, [getAllUsers, getAllLeaves, getAllAttendance, showNotification]);

  useEffect(() => {
    loadData();
    if (!user) fetchProfile();
  }, [loadData, fetchProfile, user]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      showNotification(`Leave request ${status.toLowerCase()} successfully!`, 'success');
      loadData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to update status', 'error');
    }
  };

  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500">Global system metrics and recent activities</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard label="Total Employees" value={users.length} icon={Users} color="indigo" />
        <StatsCard label="Pending Leaves" value={leaves.filter(l => l.status === 'Pending').length} icon={Calendar} color="orange" />
        <StatsCard label="Attendance Recorded" value={attendance.length} icon={ClipboardCheck} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leave Requests */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Requests</h2>
            <Link to="/admin-dashboard/leaves" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:underline">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <LeaveTable 
            leaves={leaves.slice(0, 5)} 
            loading={leaveLoading} 
            isAdmin={true} 
            onStatusUpdate={handleStatusUpdate} 
          />
        </div>

        {/* Employee Registry Preview */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Active Directory</h2>
            <Link to="/admin-dashboard/users" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:underline">
              Full Registry <ChevronRight size={14} />
            </Link>
          </div>
          <UserTable users={users.slice(0, 5)} loading={usersLoading} />
        </div>

        {/* Recent Attendance Preview */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Daily Attendance Log</h2>
            <Link to="/admin-dashboard/attendance" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:underline">
              Full Log <ChevronRight size={14} />
            </Link>
          </div>
          <AttendanceTable attendance={attendance.slice(0, 5)} loading={attendanceLoading} isAdmin={true} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
