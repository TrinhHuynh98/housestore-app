import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Layout/Footer';
import { useNavigate } from 'react-router-dom';
import { deletedOrder, listOrder } from '../actions/orderActions';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import DeleteIcon from '@mui/icons-material/Delete';

export default function OrderListScreen() {
  const navigate = useNavigate();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const dispatch = useDispatch();

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: orderDeleteLoading,
    error: orderDeleteError,
    success: orderDeleteSuccess,
  } = orderDelete;

  useEffect(() => {
    if (orderDeleteSuccess) {
      dispatch({ type: ORDER_DELETE_RESET });
    }

    dispatch(listOrder());
  }, [dispatch, orderDeleteSuccess]);

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deletedOrder(order._id));
    }
  };
  return (
    <div>
      <Helmet>Order List</Helmet>

      {orderDeleteLoading && <LoadingBox></LoadingBox>}
      {orderDeleteError && <Messagebox>{orderDeleteError}</Messagebox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>Orders Manage</h2>
          <div style={{ padding: 40 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? order.paidAt.subString(0, 10) : 'No'}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.subString(0, 10)
                        : 'No'}
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        style={{
                          borderRadius: 10,
                          backgroundColor: '#D15B5B',
                          marginTop: 10,
                          borderRadius: 30,
                          padding: 10,
                        }}
                        onClick={() => navigate(`/order/${order._id}`)}
                      >
                        Details
                      </Button>

                      <Button onClick={() => deleteHandler(order)}>
                        <DeleteIcon
                          style={{
                            backgroundColor: '#1F3137',
                            color: 'white',
                            padding: 10,
                            borderRadius: 30,
                          }}
                        />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
