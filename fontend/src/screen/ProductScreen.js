import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Chip,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
} from '@mui/material';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Footer from '../components/Layout/Footer';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, detailsProduct } from '../actions/productActions';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  useEffect(() => {
    if (successReviewCreate) {
      toast.success('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(id));
  }, [dispatch, id, successReviewCreate]);

  const addToCartHander = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(createReview(id, { rating, comment, name: userInfo.name }));
    }
  };

  return (
    <div>
      <Helmet>
        <title>Product Detail</title>
      </Helmet>
      <>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <Messagebox>{error}</Messagebox>
        ) : (
          <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
            <Grid
              container
              spacing={{ xs: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
                <img
                  style={{ height: 350 }}
                  className="img-large"
                  src={product.image}
                  alt={product.name}
                ></img>

                <Typography gutterBottom variant="h5" component="div">
                  Reviews
                </Typography>
                {product.reviews.length === 0 && (
                  <Messagebox>There is no review</Messagebox>
                )}
                <ul>
                  {product.reviews.map((review) => (
                    <li key={review._id}>
                      <strong>{review.name}</strong>{' '}
                      <span>({review.createdAt.substring(0, 10)})</span>
                      <Rating rating={review.rating} caption=""></Rating>
                      <p> - {review.comment}</p>
                    </li>
                  ))}
                </ul>
                {userInfo ? (
                  <>
                    <Typography gutterBottom variant="h5" component="div">
                      Drop your comment here!
                    </Typography>
                    <FormControl
                      sx={{ m: 1, minWidth: 150 }}
                      style={{ marginTop: 20, marginBottom: 20 }}
                    >
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Select your rating
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rating}
                        label="sort"
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="5">5 - Excelent</MenuItem>
                        <MenuItem value="4">4 - Very Good</MenuItem>
                        <MenuItem value="3">3 - Good</MenuItem>
                        <MenuItem value="2">2 - Pair</MenuItem>
                        <MenuItem value="1">1 - Poor</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        Write a Customer Review
                      </Typography>
                      <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        rows="4"
                        variant="outlined"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                      <Button
                        size="medium"
                        onClick={submitHandler}
                        style={{
                          backgroundColor: '#1F3137',
                          borderRadius: 30,
                          color: 'white',
                          margin: '0 auto',
                          display: 'flex',
                          marginBottom: 10,
                          marginTop: 20,
                        }}
                      >
                        Submit
                      </Button>
                    </FormControl>

                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <Messagebox>{errorReviewCreate}</Messagebox>
                      )}
                    </div>
                  </>
                ) : (
                  <Messagebox>
                    Please <Link to="/signin">Signin</Link> to write a review
                  </Messagebox>
                )}
              </Grid>
              <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
                <h1>{product.name}</h1>
                <Rating rating={product.rating} numViews={product.numReviews} />
                <p>Price: ${product.price}</p>
              </Grid>

              <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="p" component="div">
                        Price: ${product.price}
                      </Typography>
                      <Typography gutterBottom variant="p" component="div">
                        Status:{' '}
                        {product.countInStock > 0 ? (
                          <Chip label="In Stock" color="success" />
                        ) : (
                          <Chip label="Unavialable" color="primary" />
                        )}
                      </Typography>
                      {product.countInStock > 0 && (
                        <>
                          <InputLabel id="demo-simple-select-label">
                            Qty
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={qty}
                            label="Qty"
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </>
                      )}
                    </CardContent>
                  </CardActionArea>

                  {product.countInStock > 0 && (
                    <Button
                      size="medium"
                      onClick={addToCartHander}
                      style={{
                        backgroundColor: '#1F3137',
                        borderRadius: 30,
                        pading: 20,
                        color: 'white',
                        margin: '0 auto',
                        display: 'flex',
                        marginBottom: 10,
                      }}
                    >
                      Add to card
                    </Button>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </>

      <Footer />
    </div>
  );
}

// export default ProductScreen;
