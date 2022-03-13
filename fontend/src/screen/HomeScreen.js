import React, { useEffect } from 'react';
import Footer from '../components/Layout/Footer';
import { Box, Grid } from '@mui/material';
import Products from '../components/Products';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/Messagebox';
import { Helmet } from 'react-helmet-async';
import SlideShow from '../components/SlideShow';
import Category from '../components/Category';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <>
      <SlideShow />

      <Category />
      <div>
        <Helmet>
          <title>HouseStore</title>
        </Helmet>

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {products.map((item) => (
                <Products key={item._id} product={item}></Products>
              ))}
            </Grid>
          </Box>
        )}

        <Footer />
      </div>
    </>
  );
}
