import React, { useState } from 'react';

function DashboardOrderComponent({ orders, onStatusChange }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className='container py-4'>
      <h3 className='mb-4'>All Orders</h3>

      <div className='table-responsive'>
        <table className='table table-hover table-bordered align-middle'>
          <thead className='table-dark'>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name || 'N/A'}</td>
                <td>{order.user?.email || 'N/A'}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    <span className="badge bg-success">Paid</span>
                  ) : (
                    <span className="badge bg-danger">Not Paid</span>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <span className="badge bg-success">Delivered</span>
                  ) : (
                    <span className="badge bg-warning">Not Delivered</span>
                  )}
                </td>
                <td>
                  <button
                    className='btn btn-sm btn-outline-primary me-2'
                    onClick={() => handleViewDetails(order)}
                    data-bs-toggle='modal'
                    data-bs-target='#orderModal'
                  >
                    View Details
                  </button>
                  {!order.isDelivered && (
                    <button
                      className='btn btn-sm btn-success'
                      onClick={() => onStatusChange(order._id, 'Delivered')}
                    >
                      Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div className='modal fade' id='orderModal' tabIndex='-1' role='dialog'>
        <div className='modal-dialog modal-lg modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Order Details</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal'></button>
            </div>
            <div className='modal-body'>
              {selectedOrder ? (
                <>
                  <div className='row mb-2'>
                    <div className='col'><strong>Customer:</strong> {selectedOrder.user?.name}</div>
                    <div className='col'><strong>Email:</strong> {selectedOrder.user?.email}</div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col'><strong>Total:</strong> ${selectedOrder.totalPrice.toFixed(2)}</div>
                    <div className='col'><strong>Status:</strong> {selectedOrder.isDelivered ? 'Delivered' : 'Processing'}</div>
                  </div>
                  <hr />
                  <h6>Items</h6>
                  <ul className='list-group'>
                    {selectedOrder.orderItems.map((item, i) => (
                      <li key={i} className='list-group-item d-flex justify-content-between'>
                        <span>{item.name} × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>No order selected</p>
              )}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOrderComponent;
