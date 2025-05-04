import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // adjust path if different

export default function ProtectedAdminRoute() {
	const { user } = useAuthStore();

	if (user?.role !== 'admin') {
		// If not logged in, redirect to login page
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}

	// If logged in, render child routes
	return <Outlet />;
}
