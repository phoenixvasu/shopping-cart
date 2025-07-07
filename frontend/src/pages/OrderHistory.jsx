import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + '/orders/mine', {
          credentials: 'include',
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to fetch orders');
        setOrders(data.orders);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="order-history-page">
      <h2>Order History</h2>
      {loading && <div>Loading your orders...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && orders.length === 0 && <div>No orders found.</div>}
      {!loading && !error && orders.length > 0 && (
        <div className="order-list">
          {orders.map(order => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <span className="order-id">Order #{order._id.slice(-6)}</span>
                <span className="order-date">{new Date(order.createdAt).toLocaleString()}</span>
                <span className={`order-status status-${order.status}`}>{order.status}</span>
              </div>
              <div className="order-section">
                <strong>Shipping Address:</strong>
                <div>{order.address.name}, {order.address.email}</div>
                <div>{order.address.street}, {order.address.city}, {order.address.zip}, {order.address.country}</div>
              </div>
              <div className="order-section">
                <strong>Items:</strong>
                <ul>
                  {order.items.map(item => (
                    <li key={item.product}>
                      {item.name} x {item.quantity} (${item.price})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-section">
                <strong>Payment:</strong>
                <div>Status: {order.payment?.status || 'N/A'}</div>
                <div>Amount: ${order.payment?.amount?.toFixed(2) || order.total?.toFixed(2)}</div>
              </div>
              <div className="order-section">
                <strong>Total:</strong> ${order.total?.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 