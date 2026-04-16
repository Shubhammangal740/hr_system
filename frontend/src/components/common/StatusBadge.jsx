const StatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-green-50 text-green-700 border-green-200",
    Pending: "bg-orange-50 text-orange-700 border-orange-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
    Present: "bg-green-50 text-green-700 border-green-200",
    Absent: "bg-red-50 text-red-700 border-red-200",
    HalfDay: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
