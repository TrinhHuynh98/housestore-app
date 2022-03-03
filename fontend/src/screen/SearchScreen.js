import React, { useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listCategory, listProductsSearch } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import Products from '../components/Products';

export default function SearchScreen(props) {
  const dispatch = useDispatch();
  const { name = 'all', category = '' } = useParams();

  const productSearch = useSelector((state) => state.productSearch);
  const { loading, error, products } = productSearch;
  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    products: categories,
  } = categoryList;

  useEffect(() => {
    dispatch(
      listProductsSearch({
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
      })
    );
  }, [dispatch, name, category]);

  const getFilterUrl = (filter) => {
    const filteCategory = filter.category || category;
    const filterName = filter.name || name;
    return `/search/category/${filteCategory}/name/${filterName}`;
  };

  console.log('categories', categories);

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <Messagebox>{error}</Messagebox>
            ) : (
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {products.length} Results
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )}

            {loadingCategory ? (
              <LoadingBox></LoadingBox>
            ) : errorCategory ? (
              <Messagebox>{errorCategory}</Messagebox>
            ) : (
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardContent>
                    <Link to={getFilterUrl({ category: 'all' })}>
                      <Typography gutterBottom variant="h5" component="div">
                        Any
                      </Typography>
                    </Link>
                  </CardContent>
                  <CardContent>
                    {categories.map((item) => (
                      <Link to={getFilterUrl({ category: item })}>
                        <Typography gutterBottom variant="h5" component="div">
                          {item}
                        </Typography>
                      </Link>
                    ))}
                  </CardContent>
                </CardActionArea>
              </Card>
            )}
          </Grid>

          <Grid item xs={8} sm={8} md={8} style={{ marginTop: 20 }}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <Messagebox>{error}</Messagebox>
            ) : (
              <>
                {products.length === 0 && (
                  <Messagebox>No Product Found</Messagebox>
                )}
                <div>
                  <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {products.map((product) => (
                        <Products
                          key={product._id}
                          product={product}
                        ></Products>
                      ))}
                    </Grid>
                  </Box>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
