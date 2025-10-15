import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
// Dashboard imports
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProductsPage from './pages/dashboard/ProductsPage';
import OrdersPage from './pages/dashboard/OrdersPage';
import CustomersPage from './pages/dashboard/CustomersPage';
// Protected routes
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './store/authStore';
import ProfilePage from './pages/ProfilePage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';

function App() {
	const { fetchUser } = useAuthStore();

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);
	return (
		<Router>
			<Routes>
				{/* Main Layout */}
				<Route element={<MainLayout />}>
					<Route
						path='/'
						element={<HomePage />}
					/>
					<Route
						path='/product/:id'
						element={<ProductDetailPage />}
					/>

					<Route
						path='/login'
						element={<LoginPage />}
					/>
					<Route
						path='/register'
						element={<RegisterPage />}
					/>
					{/* Protected routes */}
					<Route element={<ProtectedRoute />}>
						<Route
							path='/cart'
							element={<CartPage />}
						/>
						<Route
							path='/checkout'
							element={<CheckoutPage />}
						/>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/payment' element={<PaymentPage />} />
					</Route>
				</Route>

				{/* Auth Layout {Dashboard layout} */}
				<Route element={<DashboardLayout />}>
					{/* Protected Admin routes */}
					<Route element={<ProtectedAdminRoute />}>
						<Route
							path='/dashboard'
							element={<DashboardPage />}
						/>
						<Route
							path='/dashboard/products'
							element={<ProductsPage />}
						/>
						<Route
							path='/dashboard/orders'
							element={<OrdersPage />}
						/>
						<Route
							path='/dashboard/customers'
							element={<CustomersPage />}
						/>
					</Route>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
