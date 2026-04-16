import { memo } from 'react';
import StatusBadge from '../common/StatusBadge';
import Loader from '../ui/Loader';
import { Check, X, Edit2, Trash2, Ban, RotateCcw } from 'lucide-react';

const LeaveTable = memo(({ 
  leaves, 
  loading, 
  isAdmin = false, 
  onStatusUpdate,
  onEdit,
  onDelete,
  onCancel
}) => {
  const isFuture = (date) => {
    const d = new Date(date);
    d.setHours(0,0,0,0);
    const today = new Date();
    today.setHours(0,0,0,0);
    return d > today;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/50">
            {isAdmin && <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Employee</th>}
            <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Type</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Durations</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Status</th>
            <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading && leaves.length === 0 ? (
            <tr><td colSpan={isAdmin ? 5 : 4} className="p-12 text-center"><Loader /></td></tr>
          ) : leaves.length === 0 ? (
            <tr><td colSpan={isAdmin ? 5 : 4} className="p-12 text-center text-gray-500 font-medium">No leave records found.</td></tr>
          ) : leaves.map((leave) => (
            <tr key={leave._id} className="hover:bg-gray-50/80 transition-colors">
              {isAdmin && (
                <td className="px-6 py-4">
                  <div className="flex flex-col text-sm">
                    <span className="font-semibold text-gray-900">{leave.userId?.name}</span>
                    <span className="text-gray-500 text-xs">{leave.userId?.email}</span>
                  </div>
                </td>
              )}
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">{leave.leaveType}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <div className="font-medium">{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</div>
                <div className="text-xs text-indigo-500 font-bold">{leave.totalDays} Days</div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={leave.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  {isAdmin ? (
                    <>
                      {leave.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => onStatusUpdate(leave._id, 'Approved')}
                            className="p-1.5 bg-green-50 text-green-600 border border-green-100 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            onClick={() => onStatusUpdate(leave._id, 'Rejected')}
                            className="p-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                      {(leave.status === 'Approved' || leave.status === 'Rejected') && (
                        <button 
                          onClick={() => onStatusUpdate(leave._id, 'Pending')}
                          className="p-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                          title="Revert to Pending"
                        >
                          <RotateCcw size={16} />
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {leave.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => onEdit(leave)}
                            className="p-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => onDelete(leave._id)}
                            className="p-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                      {leave.status === 'Approved' && isFuture(leave.startDate) && (
                        <button 
                          onClick={() => onCancel(leave._id)}
                          className="p-1.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-lg hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                          title="Cancel Leave"
                        >
                          <Ban size={16} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default LeaveTable;
