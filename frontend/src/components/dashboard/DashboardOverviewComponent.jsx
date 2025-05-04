import React from 'react';

function DashboardOverviewComponent({ stats }) {
	return (
		<div className='container py-4'>
			<h3 className='mb-4'>Dashboard Overview</h3>
			<div className='row g-4'>
				<div className='col-md-4'>
					<div className='card text-bg-primary shadow-sm border-0'>
						<div className='card-body'>
							<h5 className='card-title'>Total Orders</h5>
							<p className='display-6 fw-semibold mb-0'>
								{stats.totalOrders}
							</p>
						</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='card text-bg-success shadow-sm border-0'>
						<div className='card-body'>
							<h5 className='card-title'>Products in Stock</h5>
							<p className='display-6 fw-semibold mb-0'>
								{stats.productsInStock}
							</p>
						</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='card text-bg-warning shadow-sm border-0'>
						<div className='card-body'>
							<h5 className='card-title'>Users Signed Up</h5>
							<p className='display-6 fw-semibold mb-0'>
								{stats.usersSignedUp}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardOverviewComponent;
