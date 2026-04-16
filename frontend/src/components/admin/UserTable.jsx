import { memo } from 'react';
import Loader from '../ui/Loader';

const UserTable = memo(({ users, loading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/50">
            <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Employee Details</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Role</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Joined On</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading && users.length === 0 ? (
            <tr><td colSpan="4" className="p-12 text-center"><Loader /></td></tr>
          ) : users.length === 0 ? (
            <tr><td colSpan="4" className="p-12 text-center text-gray-500 font-medium">No employees found in registry.</td></tr>
          ) : users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-gray-900">{u.name}</span>
                  <span className="text-gray-500 text-xs">{u.email}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-md border ${
                  u.role === 'admin' 
                    ? 'bg-purple-50 text-purple-600 border-purple-100' 
                    : 'bg-gray-50 text-gray-600 border-gray-100'
                }`}>
                  {u.role}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(u.dateOfJoining).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <span className="font-bold text-indigo-600 font-mono">{u.leaveBalance}d</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default UserTable;
