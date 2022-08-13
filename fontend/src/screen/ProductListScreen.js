import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  deletedProduct,
  listProducts,
} from '../actions/productActions';
import Footer from '../components/Layout/Footer';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export default function ProductListScreen(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: productDeleteLoading,
    error: productDeleteError,
    success: productDeleteSuccess,
  } = productDelete;

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deletedProduct(product._id));
    }
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if (productDeleteSuccess) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, navigate, successCreate, productDeleteSuccess]);

  return (
    <div>
      <Helmet>Product List</Helmet>

      {productDeleteLoading && <LoadingBox></LoadingBox>}
      {productDeleteError && <Messagebox>{productDeleteError}</Messagebox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <Messagebox>{errorCreate}</Messagebox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>Product List</h2>

          <Tooltip title="Create new product" arrow>
            <AddBoxIcon
              style={{
                curson: 'pointer',
                position: 'absolute',
                right: 50,
                marginBottom: 30,
              }}
              onClick={() => createProductHandler()}
            />
          </Tooltip>

          <div style={{ padding: 40 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Button
                        onClick={() => navigate(`/product/${product._id}/edit`)}
                      >
                        <EditIcon
                          style={{
                            backgroundColor: '#1F3137',
                            color: 'white',
                            padding: 10,
                            borderRadius: 30,
                          }}
                        />
                      </Button>

                      <Button onClick={() => deleteHandler(product)}>
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
