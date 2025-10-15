import React, { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useOrderStore from '../store/orderStore';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { orders, loading, error, fetchMyOrders } = useOrderStore();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h4 className="card-title">{user?.name}</h4>
              <p className="card-text">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h2>Your Orders</h2>
          {loading && <p>Loading orders...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && orders.length === 0 ? (
            <div className="alert alert-info">
              You haven't placed any orders yet. <Link to="/">Start shopping!</Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          <span className="badge bg-success">Paid</span>
                        ) : (
                          <span className="badge bg-warning">Not Paid</span>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <span className="badge bg-success">Delivered</span>
                        ) : (
                          <span className="badge bg-warning">Not Delivered</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
