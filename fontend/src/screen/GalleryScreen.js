import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import Footer from '../components/Layout/Footer';

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function GalleryScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <Grid
          container
          align="center"
          justify="center"
          alignItems="center"
          style={{ marginBottom: 20 }}
        >
          <Masonry
            columns={3}
            spacing={2}
            style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
          >
            {products.map((item, index) => (
              <div key={index}>
                <Label>{index + 1}</Label>
                <img
                  src={`${item.image}?w=162&auto=format`}
                  srcSet={`${item.image}?w=162&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                  style={{
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    display: 'block',
                    width: '100%',
                  }}
                />
              </div>
            ))}
          </Masonry>
        </Grid>
      )}

      <Footer />
    </div>
  );
}
