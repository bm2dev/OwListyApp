import { Navigate, Outlet, useLocation } from 'react-router-native';
//
import { useAuth } from '../../context/Auth';

export function RequireAuth() {
	const { user } = useAuth();
	const location = useLocation();

	// Verifica se tem usuário logado
	if (!user) return <Navigate to='/login' state={{ from: location }} replace />;

	return <Outlet />;
}
