import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Button,
  FormControl,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { useParams } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const [sdkReady, setSdkReady] = useState(false);
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || (order && order._id != id)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(id));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, id, order, sdkReady, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return (
    <div>
      <Helmet>
        <title>Place Order</title>
      </Helmet>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <>
          <Box
            sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10, padding: 20 }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={8} sm={8} md={8} style={{ marginTop: 20 }}>
                <Card style={{ marginTop: 10 }}>
                  <p>
                    <b>Shipping</b>
                  </p>

                  <CardActionArea>
                    <CardContent>
                      <p>Name: {order.shippingAddress.fullName}</p>
                      <p>
                        Adress: {order.shippingAddress.address},{' '}
                        {order.shippingAddress.city} ,
                        {order.shippingAddress.postalCode},{' '}
                        {order.shippingAddress.country}
                      </p>

                      {order.isDelivered ? (
                        <Messagebox variant="danger">
                          Delivered at {order.deliveredAt}
                        </Messagebox>
                      ) : (
                        <Messagebox variant="danger">Not Delivered</Messagebox>
                      )}
                      <Link to="/shipping">Edit</Link>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card style={{ marginTop: 10 }}>
                  <p>
                    <b>Payment Method:</b> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Messagebox variant="danger">
                      Paid at {order.paidAt}
                    </Messagebox>
                  ) : (
                    <Messagebox variant="danger">Not Paid</Messagebox>
                  )}
                </Card>
                <Card style={{ marginTop: 10, padding: 20 }}>
                  <p>
                    <b>Cart Items</b>
                  </p>

                  <CardActionArea>
                    <CardContent>
                      {order.orderItems.map((item) => (
                        <Grid container spacing={{ md: 3 }}>
                          <Grid item xs={6} sm={6} md={6}>
                            <Link to={`/product/${item.slug}`}>
                              <Avatar
                                sx={{ width: 100, height: 100 }}
                                src={item.image}
                                alt={item.name}
                              />
                            </Link>
                            <p>{item.name}</p>
                          </Grid>

                          <Grid item xs={6} sm={6} md={6}>
                            <p> Price: $ {item.price}</p>
                          </Grid>
                        </Grid>
                      ))}

                      <Link to="/cart">Edit</Link>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
                <p>
                  <b>Order Summary</b>
                </p>
                <Card>
                  <p>Items</p>

                  <CardActionArea>
                    <CardContent>
                      <Grid container spacing={{ md: 3 }}>
                        <Grid item xs={6} sm={6} md={6}>
                          Items
                        </Grid>

                        <Grid item xs={6} sm={6} md={6}>
                          ${order.itemsPrice}
                        </Grid>
                      </Grid>
                      <Grid container spacing={{ md: 3 }}>
                        <Grid item xs={6} sm={6} md={6}>
                          Shipping
                        </Grid>

                        <Grid item xs={6} sm={6} md={6}>
                          ${order.shippingPrice}
                        </Grid>
                      </Grid>
                      <Grid container spacing={{ md: 3 }}>
                        <Grid item xs={6} sm={6} md={6}>
                          Tax
                        </Grid>

                        <Grid item xs={6} sm={6} md={6}>
                          ${order.taxPrice}
                        </Grid>
                      </Grid>
                      <Grid container spacing={{ md: 3 }}>
                        <Grid item xs={6} sm={6} md={6}>
                          Order Total
                        </Grid>

                        <Grid item xs={6} sm={6} md={6}>
                          ${order.totalPrice}
                        </Grid>
                      </Grid>

                      {!order.isPaid && (
                        <>
                          {!sdkReady ? (
                            <LoadingBox></LoadingBox>
                          ) : (
                            <>
                              {errorPay && <Messagebox>{errorPay}</Messagebox>}
                              {loadingPay && <LoadingBox></LoadingBox>}
                              <PayPalButton
                                amount={order.totalPrice}
                                onSuccess={successPaymentHandler}
                              ></PayPalButton>
                            </>
                          )}
                        </>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </div>
  );
}
