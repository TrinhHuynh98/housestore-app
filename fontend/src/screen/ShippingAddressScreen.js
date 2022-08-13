import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FormControl,
  TextField,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import CheckoutStep from '../components/CheckoutStep';
import Footer from '../components/Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAdresss } from '../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    [`& fieldset`]: {
      borderRadius: 30,
    },
  },
});

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const classes = useStyles();
  const userSignin = useSelector((state) => state.userSignin);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);

  console.log('shippingAddress', shippingAddress);

  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  console.log('userAddressMap', userAddressMap);
  const { userInfo } = userSignin;
  if (!userInfo) {
    navigate('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const shippingHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        'You did not set your location on map. Continue?'
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAdresss({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      navigate('/payment');
    }
    dispatch(
      saveShippingAdresss({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>Shipping Adresss</Helmet>
      <CheckoutStep />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '30vh' }}
      >
        <Typography component="h1" variant="h5" style={{ marginTop: 20 }}>
          Shipping
        </Typography>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="Full Name"
            defaultValue={fullName}
            classes={{
              root: classes.root,
            }}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="Adress"
            defaultValue={address}
            classes={{
              root: classes.root,
            }}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="City"
            defaultValue={city}
            classes={{
              root: classes.root,
            }}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="Postal Code"
            defaultValue={postalCode}
            classes={{
              root: classes.root,
            }}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="Country"
            defaultValue={country}
            classes={{
              root: classes.root,
            }}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </FormControl>

        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <Button
            size="small"
            onClick={shippingHandler}
            classes={{
              root: classes.root,
            }}
            style={{
              backgroundColor: '#1F3137',
              color: 'white',
              border: 'solid 1px white',
              padding: 10,
              borderRadius: 30,
            }}
          >
            Continue
          </Button>
        </FormControl>
      </Grid>
      <Footer />
    </div>
  );
}
