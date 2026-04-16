import { useState, useEffect, useCallback } from 'react';
import { useLeave } from '../../hooks/useLeave';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../context/NotificationContext';
import LeaveTable from '../../components/leave/LeaveTable';
import LeaveForm from '../../components/leave/LeaveForm';
import LeaveEditModal from '../../components/leave/LeaveEditModal';

const MyLeaves = () => {
  const { getMyLeaves, applyLeave, updateLeave, deleteLeave, cancelLeave, loading } = useLeave();
  const { fetchProfile } = useAuth();
  const { showNotification } = useNotification();
  const [leaves, setLeaves] = useState([]);
  const [editingLeave, setEditingLeave] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const data = await getMyLeaves();
      setLeaves(data);
    } catch (err) {
      showNotification('Failed to load your leave history', 'error');
    }
  }, [getMyLeaves, showNotification]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
    if (!window.confirm('Are you sure you want to delete this pending leave request?')) return;
    try {
      await deleteLeave(id);
      showNotification('Leave request deleted successfully!', 'success');
      loadData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to delete leave', 'error');
    }
  };

  const handleCancelLeave = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this approved leave? Your balance will be restored.')) return;
    try {
      await cancelLeave(id);
      showNotification('Leave request cancelled successfully!', 'success');
      loadData();
      fetchProfile();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to cancel leave', 'error');
    }
  };

  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Leave History</h1>
        <p className="text-gray-500 text-sm">Track your leave applications and remaining balance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
          <LeaveTable 
            leaves={leaves} 
            loading={loading} 
            onEdit={setEditingLeave}
            onDelete={handleDeleteLeave}
            onCancel={handleCancelLeave}
          />
        </div>

        <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold mb-6 text-indigo-600">New Application</h2>
          <LeaveForm onSubmit={handleApplyLeave} loading={loading} />
        </div>
      </div>

      <LeaveEditModal 
        isOpen={!!editingLeave}
        onClose={() => setEditingLeave(null)}
        leave={editingLeave}
        onSubmit={handleUpdateLeave}
        loading={loading}
      />
    </div>
  );
};

export default MyLeaves;
