import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
const CustomerViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const { customer } = useAuthContext();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/vieworder');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to retrieve orders:', error);
      }
    };
    fetchOrders();
  }, []);
  const calculateTotalRewardPoints = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };
  const updateCustomerRewardPoints = async (customerId, newRewardPoints) => {
    try {
      await axios.patch(`/api/customers/${customerId}`, {
        rewardPoints: newRewardPoints,
      });
    } catch (error) {
      throw new Error('Failed to update customer reward points.');
    }
  };
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`/api/orders/delete/${orderId}`);
    } catch (error) {
      throw new Error('Failed to delete the order.');
    }
  };
  const fetchOrders = async () => {
    try {
      const ordersResponse = await axios.get('/api/orders/vieworder');
      return ordersResponse.data;
    } catch (error) {
      throw new Error('Failed to retrieve orders.');
    }
  };
  const handleReceivedOrder = async (orderId, setOrders) => {
    try {
      const order = orders.find((order) => order._id === orderId);
      if (!order) {
        throw new Error('Order not found.');
      }
        const totalRewardPoints = calculateTotalRewardPoints(order.items);
        const response = await axios.get(`/api/customers/${order.customer._id}`);
      const currentRewardPoints = response.data.rewardPoints;
        const newRewardPoints = currentRewardPoints + totalRewardPoints;
        await updateCustomerRewardPoints(order.customer._id, newRewardPoints);
        alert(`Reward points have been incremented by ${totalRewardPoints}`);
        await handleDeleteOrder(orderId);
        const ordersData = await fetchOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to handle received order:', error.message);
      alert('Failed to handle received order. Please try again later.');
    }
  };
  let navigate = useNavigate();
  return (
    <div className="table-responsive">
      <>
        <button className="btn btn-secondary float-right" onClick={() => navigate(-1)}>
          Back
        </button>
      </>
      <>
        <button className="btn btn-primary float-right" onClick={() => navigate('/customerhome')}>
          Home
        </button>
      </>
      <table className="table riped  table-hover table-bordered container">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Reward Points</th>
            <th>Order Date</th>
            <th>Items</th>
            <th>Cancel Order</th> {/* Added column for delete button */}
           <th>Receive Order</th> {/* Added column for delete button */}
           <th>Order Type</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.customer.name}</td>
              <td>{order.customer.rewardPoints}</td>
              <td>{order.orderDate}</td>
              <td>
                <table className="table riped  table-hover table-bordered container">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Item Price</th>
                      <th>Requested Quantity</th>
                      <th>Total Price </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item._id}>
                        <td>{item.item ? item.item.name : 'null'}</td>
                        <td>{item.item ? item.item.price : 'null'}</td>
                        <td>{item.quantity}</td>
                        <td>{item.quantity * item.item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Cancel
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleReceivedOrder(order._id)}
                >
                 Order Recieved
                </button>
              </td>
<td>{order.isTakeAway ? 'Take Away' : 'Dine In'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CustomerViewOrders;