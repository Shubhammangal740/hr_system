import { useState, useEffect, useCallback } from 'react';
import { useAttendance } from '../../hooks/useAttendance';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import { useNotification } from '../../context/NotificationContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Clock, CheckCircle2, Filter, X } from 'lucide-react';

const MyAttendance = () => {
  const { getMyAttendance, markAttendance, loading } = useAttendance();
  const { showNotification } = useNotification();
  const [attendance, setAttendance] = useState([]);
  const [isMarking, setIsMarking] = useState(false);
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });

  const loadData = useCallback(async (currentFilters = {}) => {
    try {
      const data = await getMyAttendance(currentFilters);
      setAttendance(data);
    } catch (err) {
      showNotification('Failed to load your attendance history', 'error');
    }
  }, [getMyAttendance, showNotification]);

  useEffect(() => {
    loadData(filters);
  }, [loadData, filters]);

  const handleMarkAttendance = async () => {
    setIsMarking(true);
    try {
      await markAttendance({
        date: new Date().toISOString(),
        status: 'Present'
      });
      showNotification('Attendance marked successfully!', 'success');
      loadData(filters);
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to mark attendance', 'error');
    } finally {
      setIsMarking(false);
    }
  };

  const clearFilters = () => setFilters({ startDate: '', endDate: '' });

  const hasMarkedToday = attendance.some(a => 
    new Date(a.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Log</h1>
          <p className="text-gray-500 text-sm">Monitor your daily attendance history</p>
        </div>

        <Button 
          onClick={handleMarkAttendance} 
          disabled={hasMarkedToday || isMarking}
          loading={isMarking}
        >
          {hasMarkedToday ? (
            <>
              <CheckCircle2 size={18} />
              Marked Today
            </>
          ) : (
            <>
              <Clock size={18} />
              Mark Attendance
            </>
          )}
        </Button>
      </div>

      {/* Filters Overlay/Bar */}
      <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input 
            label="From Date"
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Input 
            label="To Date"
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
          />
        </div>
        {(filters.startDate || filters.endDate) && (
          <Button variant="ghost" className="text-red-500 hover:text-red-600 mb-0.5" onClick={clearFilters}>
            <X size={16} /> Clear
          </Button>
        )}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
        <AttendanceTable attendance={attendance} loading={loading} />
      </div>
    </div>
  );
};

export default MyAttendance;
