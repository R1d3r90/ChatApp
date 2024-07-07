import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;