import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    
    if (!user || !allowedRoles.includes(user.role)) {
        if (user?.role === 'admin') return <Navigate to="/admin-dashboard" />;
        if (user?.role === 'employee') return <Navigate to="/employee-dashboard" />;
        return <Navigate to="/login" />;
    }

    return children;
};

export default RoleRoute;
