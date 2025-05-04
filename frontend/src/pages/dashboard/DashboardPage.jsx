import React from 'react';
import { useState, useEffect } from 'react';
import DashboardOverviewComponent from '../../components/dashboard/DashboardOverviewComponent';

function DashboardPage() {
	const [stats, setStats] = useState({
		totalOrders: 0,
		productsInStock: 0,
		usersSignedUp: 0,
	});

	useEffect(() => {
		// Fetch from your API endpoint here
		const fetchStats = async () => {
			// Simulated API data
			const res = {
				totalOrders: 87,
				productsInStock: 129,
				usersSignedUp: 45,
			};
			setStats(res);
		};

		fetchStats();
	}, []);
	return (
		<div id='dashboard'>
			<DashboardOverviewComponent stats={stats} />
		</div>
	);
}

export default DashboardPage;
