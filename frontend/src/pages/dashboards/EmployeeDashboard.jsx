import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLeave } from '../../hooks/useLeave';
import { useAttendance } from '../../hooks/useAttendance';
import StatsCard from '../../components/common/StatsCard';
import LeaveForm from '../../components/leave/LeaveForm';
import LeaveTable from '../../components/leave/LeaveTable';
import LeaveEditModal from '../../components/leave/LeaveEditModal';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import Button from '../../components/ui/Button';
import { Calendar, ClipboardCheck, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { user, fetchProfile } = useAuth();
  const { applyLeave, getMyLeaves, updateLeave, deleteLeave, cancelLeave, loading: leaveLoading } = useLeave();
  const { markAttendance, getMyAttendance, loading: attendanceLoading } = useAttendance();
  const { showNotification } = useNotification();
  
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [isMarking, setIsMarking] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const [leavesData, attendanceData] = await Promise.all([
        getMyLeaves(),
        getMyAttendance()
      ]);
      setLeaves(leavesData);
      setAttendance(attendanceData);
    } catch (err) {
      showNotification('Failed to load dashboard data', 'error');
    }
  }, [getMyLeaves, getMyAttendance, showNotification]);

  useEffect(() => {
    loadData();
    if (!user) fetchProfile();
  }, [loadData, fetchProfile, user]);

  const handleApplyLeave = async (data) => {
    try {
      await applyLeave(data);
      showNotification('Leave application submitted successfully!', 'success');
      loadData();
      fetchProfile();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to apply for leave', 'error');
    }
  };

  const handleUpdateLeave = async (id, data) => {
    try {
      await updateLeave(id, data);
      showNotification('Leave request updated successfully!', 'success');
      setEditingLeave(null);
      loadData();
      fetchProfile();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to update leave', 'error');
    }
  };

  const handleDeleteLeave = async (id) => {
    if (!window.confirm('Delete this pending leave request?')) return;
    try {
      await deleteLeave(id);
      showNotification('Leave request deleted successfully!', 'success');
      loadData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to delete leave', 'error');
    }
  };

  const handleCancelLeave = async (id) => {
    if (!window.confirm('Cancel this approved leave? Balance will be restored.')) return;
    try {
      await cancelLeave(id);
      showNotification('Leave request cancelled successfully!', 'success');
      loadData();
      fetchProfile();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to cancel leave', 'error');
    }
  };

  const handleMarkAttendance = async () => {
    setIsMarking(true);
    try {
      await markAttendance({
        date: new Date().toISOString(),
        status: 'Present'
      });
      showNotification('Attendance marked successfully for today!', 'success');
      loadData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to mark attendance', 'error');
    } finally {
      setIsMarking(false);
    }
  };

  const hasMarkedToday = attendance.some(a => 
    new Date(a.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-8 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        
        <Button 
          onClick={handleMarkAttendance} 
          disabled={hasMarkedToday || isMarking}
          loading={isMarking}
        >
          {hasMarkedToday ? (
            <><CheckCircle2 size={18} /> Attendance Marked</>
          ) : (
            <><Clock size={18} /> Mark Attendance Today</>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Leave Balance" value={user?.leaveBalance || 0} icon={Calendar} color="indigo" />
        <StatsCard label="Total Leaves" value={leaves.length} icon={Calendar} color="blue" />
        <StatsCard label="Days Present" value={attendance.filter(a => a.status === 'Present').length} icon={ClipboardCheck} color="green" />
        <StatsCard label="Attendance Rate" value={`${attendance.length > 0 ? Math.round((attendance.filter(a => a.status === 'Present').length / 30) * 100) : 0}%`} icon={Clock} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-indigo-600" />
            Apply for Leave
          </h2>
          <LeaveForm onSubmit={handleApplyLeave} loading={leaveLoading} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Requests</h2>
              <Link to="/employee-dashboard/leaves" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:underline">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <LeaveTable 
              leaves={leaves.slice(0, 5)} 
              loading={leaveLoading} 
              onEdit={setEditingLeave}
              onDelete={handleDeleteLeave}
              onCancel={handleCancelLeave}
            />
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Attendance</h2>
              <Link to="/employee-dashboard/attendance" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:underline">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <AttendanceTable attendance={attendance.slice(0, 5)} loading={attendanceLoading} />
          </div>
        </div>
      </div>

      <LeaveEditModal 
        isOpen={!!editingLeave}
        onClose={() => setEditingLeave(null)}
        leave={editingLeave}
        onSubmit={handleUpdateLeave}
        loading={leaveLoading}
      />
    </div>
  );
};

export default EmployeeDashboard;
