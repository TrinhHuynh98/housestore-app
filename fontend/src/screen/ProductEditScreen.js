import React, { useEffect, useState } from 'react';
import { FormControl, TextField, Grid, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsProduct, updatedProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    [`& fieldset`]: {
      borderRadius: 30,
    },
  },
});

export default function ProductEditScreen() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      navigate('/productlist');
    }
    if (!product || product._id !== id || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, id, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatedProduct({
        _id: id,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '30vh' }}
      >
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <Messagebox>{errorUpdate}</Messagebox>}
        {loading && <LoadingBox></LoadingBox>}
        {error && <Messagebox>{error}</Messagebox>}
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            classes={{
              root: classes.root,
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            classes={{
              root: classes.root,
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            classes={{
              root: classes.root,
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="brand"
            label="Brand"
            type="text"
            fullWidth
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            classes={{
              root: classes.root,
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="count"
            label="Count in stock"
            type="number"
            fullWidth
            value={countInStock}
            onChange={(e) => {
              setCountInStock(e.target.value);
            }}
            classes={{
              root: classes.root,
            }}
          />
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="description"
            multiline
            fullWidth
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            classes={{
              root: classes.root,
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="img"
            label="Image"
            type="text"
            fullWidth
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            classes={{
              root: classes.root,
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="img"
            label="Choose Image"
            type="file"
            fullWidth
            onChange={uploadFileHandler}
            classes={{
              root: classes.root,
            }}
          />
          {loadingUpload && <LoadingBox></LoadingBox>}
          {errorUpload && <Messagebox>{errorUpload}</Messagebox>}
        </FormControl>

        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#1F3137',
              color: 'white',
              border: 'solid 1px',
              borderRadius: 30,
              padding: 20,
            }}
            onClick={submitHandler}
          >
            Update
          </Button>
        </FormControl>
      </Grid>
    </div>
  );
}
