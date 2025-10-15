import React, { useEffect } from 'react';
import useOrderStore from '../../store/orderStore';
import DashboardOrdersComponent from '../../components/dashboard/DashboardOrderComponent';

function OrdersPage() {
  const { orders, loading, error, fetchAllOrders, markAsDelivered } = useOrderStore();

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const handleStatusChange = (orderId, newStatus) => {
    if (newStatus === 'Delivered') {
      markAsDelivered(orderId);
    }
    // You can add more status changes here if needed
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <DashboardOrdersComponent
      orders={orders}
      onStatusChange={handleStatusChange}
    />
  );
}

export default OrdersPage;
