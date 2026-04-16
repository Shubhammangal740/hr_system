import { memo } from 'react';
import StatusBadge from '../common/StatusBadge';
import Loader from '../ui/Loader';

const AttendanceTable = memo(({ attendance, loading, isAdmin = false }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/50">
            {isAdmin && <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Employee</th>}
            <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Date</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading && attendance.length === 0 ? (
            <tr><td colSpan={isAdmin ? 3 : 2} className="p-12 text-center"><Loader /></td></tr>
          ) : attendance.length === 0 ? (
            <tr><td colSpan={isAdmin ? 3 : 2} className="p-12 text-center text-gray-500 font-medium">No attendance records found.</td></tr>
          ) : attendance.map((att) => (
            <tr key={att._id} className="hover:bg-gray-50/80 transition-colors">
              {isAdmin && (
                <td className="px-6 py-4">
                  <div className="flex flex-col text-sm">
                    <span className="font-semibold text-gray-900">{att.userId?.name}</span>
                    <span className="text-gray-500 text-xs">{att.userId?.email}</span>
                  </div>
                </td>
              )}
              <td className="px-6 py-4 text-sm text-gray-600">
                {new Date(att.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={att.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default AttendanceTable;
