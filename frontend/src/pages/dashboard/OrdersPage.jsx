import React, { useState } from 'react';
import DashboardOrdersComponent from '../../components/dashboard/DashboardOrderComponent';

function OrdersPage() {
	const sampleOrders = [
		{
			id: 1,
			customerName: 'Ali Raza',
			email: 'ali@example.com',
			total: 199.99,
			status: 'Pending',
			items: [
				{ name: 'Headphones', quantity: 1, price: 99.99 },
				{ name: 'Mouse', quantity: 1, price: 100.0 },
			],
		},
		{
			id: 2,
			customerName: 'Sara Khan',
			email: 'sara@example.com',
			total: 79.49,
			status: 'Shipped',
			items: [{ name: 'Keyboard', quantity: 1, price: 79.49 }],
		},
	];
	const [orders, setOrders] = useState(sampleOrders);

	const handleStatusChange = (orderId, newStatus) => {
		setOrders((prev) =>
			prev.map((order) =>
				order.id === orderId ? { ...order, status: newStatus } : order
			)
		);
	};

	return (
		<DashboardOrdersComponent
			orders={orders}
			onStatusChange={handleStatusChange}
		/>
	);
}

export default OrdersPage;
