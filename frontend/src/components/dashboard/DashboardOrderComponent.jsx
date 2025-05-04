import React, { useState } from 'react';

function DashboardOrderComponent({ orders, onStatusChange }) {
	const [selectedOrder, setSelectedOrder] = useState(null);

	const handleViewDetails = (order) => {
		setSelectedOrder(order);
	};

	const handleStatusChange = (orderId, newStatus) => {
		onStatusChange(orderId, newStatus);
	};

	return (
		<div className='container py-4'>
			<h3 className='mb-4'>All Orders</h3>

			<div className='table-responsive'>
				<table className='table table-hover table-bordered align-middle'>
					<thead className='table-dark'>
						<tr>
							<th>#</th>
							<th>Customer</th>
							<th>Email</th>
							<th>Total</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order, index) => (
							<tr key={order.id}>
								<td>{index + 1}</td>
								<td>{order.customerName}</td>
								<td>{order.email}</td>
								<td>${order.total.toFixed(2)}</td>
								<td>
									<select
										className='form-select form-select-sm w-auto'
										value={order.status}
										onChange={(e) =>
											handleStatusChange(
												order.id,
												e.target.value
											)
										}
									>
										<option value='Pending'>Pending</option>
										<option value='Shipped'>Shipped</option>
										<option value='Delivered'>
											Delivered
										</option>
									</select>
								</td>
								<td>
									<button
										className='btn btn-sm btn-outline-primary'
										onClick={() => handleViewDetails(order)}
										data-bs-toggle='modal'
										data-bs-target='#orderModal'
									>
										View Details
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modal */}
			<div
				className='modal fade '
				id='orderModal'
				aria-hidden='true'
				tabIndex='-1'
				role='dialog'
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
			>
				<div
					className='modal-dialog modal-lg modal-dialog-centered'
					role='document'
				>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title'>Order Details</h5>
							<button
								type='button'
								className='btn-close'
								// onClick={() => setShowModal(false)}
								data-bs-dismiss='modal'
							></button>
						</div>
						<div className='modal-body'>
							{selectedOrder ? (
								<>
									<div className='row mb-2'>
										<div className='col'>
											<strong>Customer:</strong>{' '}
											{selectedOrder.customerName}
										</div>
										<div className='col'>
											<strong>Email:</strong>{' '}
											{selectedOrder.email}
										</div>
									</div>
									<div className='row mb-2'>
										<div className='col'>
											<strong>Total:</strong> $
											{selectedOrder.total.toFixed(2)}
										</div>
										<div className='col'>
											<strong>Status:</strong>{' '}
											{selectedOrder.status}
										</div>
									</div>
									<hr />
									<h6>Items</h6>
									<ul className='list-group'>
										{selectedOrder.items.map((item, i) => (
											<li
												key={i}
												className='list-group-item d-flex justify-content-between'
											>
												<span>
													{item.name} ×{' '}
													{item.quantity}
												</span>
												<span>
													$
													{(
														item.price *
														item.quantity
													).toFixed(2)}
												</span>
											</li>
										))}
									</ul>
								</>
							) : (
								<p>No order selected</p>
							)}
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								// onClick={() => setShowModal(false)}
								data-bs-dismiss='modal'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardOrderComponent;
