import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import NotFound from './pages/NotFound';

import EmployeeDashboard from './pages/dashboards/EmployeeDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import MyLeaves from './pages/employee/MyLeaves';
import MyAttendance from './pages/employee/MyAttendance';
import UserRegistry from './pages/admin/UserRegistry';
import GlobalLeaves from './pages/admin/GlobalLeaves';
import GlobalAttendance from './pages/admin/GlobalAttendance';

const App = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard'} />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard'} />} />

            <Route element={<ProtectedRoute><RoleRoute allowedRoles={['employee']}><DashboardLayout /></RoleRoute></ProtectedRoute>}>
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                <Route path="/employee-dashboard/leaves" element={<MyLeaves />} />
                <Route path="/employee-dashboard/attendance" element={<MyAttendance />} />
            </Route>

            <Route element={<ProtectedRoute><RoleRoute allowedRoles={['admin']}><DashboardLayout /></RoleRoute></ProtectedRoute>}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-dashboard/users" element={<UserRegistry />} />
                <Route path="/admin-dashboard/leaves" element={<GlobalLeaves />} />
                <Route path="/admin-dashboard/attendance" element={<GlobalAttendance />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
