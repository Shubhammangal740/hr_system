import { useState, useEffect, useCallback } from 'react';
import { useLeave } from '../../hooks/useLeave';
import LeaveTable from '../../components/leave/LeaveTable';
import { useNotification } from '../../context/NotificationContext';

const GlobalLeaves = () => {
  const { getAllLeaves, updateLeaveStatus, loading } = useLeave();
  const { showNotification } = useNotification();
  const [leaves, setLeaves] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const data = await getAllLeaves();
      setLeaves(data);
    } catch (err) {
      showNotification('Failed to load leave requests', 'error');
    }
  }, [getAllLeaves, showNotification]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Global Leave Requests</h1>
        <p className="text-gray-500 text-sm">Review and manage leave applications across the organization</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
        <LeaveTable 
          leaves={leaves} 
          loading={loading} 
          isAdmin={true} 
          onStatusUpdate={handleStatusUpdate} 
        />
      </div>
    </div>
  );
};

export default GlobalLeaves;
