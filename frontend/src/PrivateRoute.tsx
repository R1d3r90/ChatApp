import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    console.log(`Is Authenticated: ${isAuthenticated}`);

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;