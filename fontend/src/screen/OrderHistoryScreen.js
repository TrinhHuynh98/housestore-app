import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';

export default function OrderHistoryScreen() {
  const navigate = useNavigate();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div>
      <Helmet>Order history</Helmet>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>Order History</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      <p
                        style={{
                          backgroundColor: '#00860B',
                          borderRadius: 10,
                          textAlign: 'center',
                        }}
                      >
                        order.paidAt.substring(0, 10)
                      </p>
                    ) : (
                      <p
                        style={{
                          backgroundColor: '#FF133E',
                          borderRadius: 10,
                          textAlign: 'center',
                        }}
                      >
                        No
                      </p>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <p
                        style={{
                          backgroundColor: '#00860B',
                          borderRadius: 10,
                          textAlign: 'center',
                        }}
                      >
                        order.deliveredAt.substring(0, 10)
                      </p>
                    ) : (
                      <p
                        style={{
                          backgroundColor: '#FF133E',
                          borderRadius: 10,
                          textAlign: 'center',
                        }}
                      >
                        No
                      </p>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#D15B5B',
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 30,
                      }}
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
