import React, { useEffect } from 'react';
import Products from '../components/Products';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Layout/Footer';
import { Box, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/Messagebox';
import { listProducts } from '../actions/productActions';

export default function ProductPage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Product</title>
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
  );
}
