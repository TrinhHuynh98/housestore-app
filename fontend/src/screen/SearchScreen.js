import React, { useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsSearch } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import Products from '../components/Products';
import { prices, ratings } from '../utils';
import Rating from '../components/Rating';

export default function SearchScreen(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();

  const productSearch = useSelector((state) => state.productSearch);
  const { loading, error, products, page, pages } = productSearch;
  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = categoryList;

  useEffect(() => {
    dispatch(
      listProductsSearch({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
      })
    );
  }, [dispatch, name, category, min, max, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filteCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filteCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  console.log('product', products);

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
                  <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={order}
                    label="sort"
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <MenuItem value="newest">Newest Arrivals</MenuItem>
                    <MenuItem value="lowest">Price: Low to High</MenuItem>
                    <MenuItem value="highest">Price: High to Low</MenuItem>
                    <MenuItem value="toprated">Avg: Customer Reviews</MenuItem>
                  </Select>
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
                    {categories.map((item) => (
                      <Link to={getFilterUrl({ category: item })}>
                        <Typography gutterBottom variant="h5" component="div">
                          {item}
                        </Typography>
                      </Link>
                    ))}
                  </CardContent>

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Price
                    </Typography>

                    {prices.map((p) => (
                      <Link
                        key={p.name}
                        to={getFilterUrl({ min: p.min, max: p.max })}
                      >
                        <Typography gutterBottom variant="h5" component="div">
                          {p.name}
                        </Typography>
                      </Link>
                    ))}
                  </CardContent>

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Avg. Customer Review
                    </Typography>

                    {ratings.map((r) => (
                      <Link
                        key={r.name}
                        to={getFilterUrl({ rating: r.rating })}
                      >
                        <Rating caption={' & up'} rating={r.rating} />
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
                  <div>
                    {[...Array(pages).keys()].map((x) => (
                      <Link key={x + 1} to={getFilterUrl({ page: x + 1 })}>
                        {x + 1}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
