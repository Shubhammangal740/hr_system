import { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import UserTable from '../../components/admin/UserTable';
import { useNotification } from '../../context/NotificationContext';

const UserRegistry = () => {
  const { getAllUsers, loading } = useAdmin();
  const { showNotification } = useNotification();
  const [users, setUsers] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      showNotification('Failed to load user registry', 'error');
    }
  }, [getAllUsers, showNotification]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Employee Registry</h1>
        <p className="text-gray-500 text-sm">View and manage all registered staff members</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
        <UserTable users={users} loading={loading} />
      </div>
    </div>
  );
};

export default UserRegistry;
