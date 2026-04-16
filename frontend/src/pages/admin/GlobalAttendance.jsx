import { useState, useEffect, useCallback } from 'react';
import { useAttendance } from '../../hooks/useAttendance';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import { useNotification } from '../../context/NotificationContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Search, X, Filter } from 'lucide-react';

const GlobalAttendance = () => {
  const { getAllAttendance, loading } = useAttendance();
  const { showNotification } = useNotification();
  const [attendance, setAttendance] = useState([]);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', userId: '' });

  const loadData = useCallback(async (currentFilters = filters) => {
    try {
      const data = await getAllAttendance(currentFilters);
      setAttendance(data);
    } catch (err) {
      showNotification('Failed to load attendance logs', 'error');
    }
  }, [getAllAttendance, showNotification, filters]);

  useEffect(() => {
    loadData();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadData(filters);
  };

  const clearFilters = () => {
    const fresh = { startDate: '', endDate: '', userId: '' };
    setFilters(fresh);
    loadData(fresh);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Monitoring</h1>
          <p className="text-gray-500 text-sm">Monitor and filter staff attendance records</p>
        </div>
      </div>

      <form onSubmit={handleFilterSubmit} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input 
            label="Start Date"
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Input 
            label="End Date"
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
            <Search size={18} className="mr-2" /> Search
          </Button>
          {(filters.startDate || filters.endDate || filters.userId) && (
            <Button variant="ghost" className="text-red-500 hover:text-red-600" onClick={clearFilters}>
              <X size={18} className="mr-2" /> Reset
            </Button>
          )}
        </div>
      </form>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
        <AttendanceTable attendance={attendance} loading={loading} isAdmin={true} />
      </div>
    </div>
  );
};

export default GlobalAttendance;
