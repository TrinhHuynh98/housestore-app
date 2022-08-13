import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Rating from './Rating';
import { makeStyles } from '@mui/styles';
import { addToCart } from '../actions/cartAction.js';
import { useDispatch } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  productDetail: {
    textAlign: 'center',
    fontFamily: 'Monaco',
  },
  addToCartBtn: {
    '&:hover': {
      opacity: '0.8',
    },
  },
});

function Products(props) {
  const { product } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const Style = {
    height: 100,
  };

  console.log('product', product._id);

  return (
    <>
      <Grid item xs={4} sm={4} md={4} style={{ marginTop: 10 }}>
        <Card key={product._id} sx={{ maxWidth: 345 }}>
          <Link to={`/product/${product._id}`}>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
          </Link>
          <CardContent>
            <Typography gutterBottom className={classes.productDetail}>
              <h2>
                <b>{product.name}</b>
              </h2>
            </Typography>
            <Typography className={classes.productDetail}>
              {product.description}
            </Typography>
            <Typography className={classes.productDetail}>
              Price: <b>${product.price}</b>
            </Typography>
          </CardContent>

          <CardActions>
            <div style={{ display: 'flex' }}>
              <Rating rating={product.rating} numViews={product.numReviews} />
              {product.countInStock === 0 ? (
                <Button
                  disabled
                  size="small"
                  style={{
                    marginLeft: 20,
                    color: 'black',
                    border: 'solid 1px black',
                    height: 50,
                    borderRadius: 30,
                    padding: 20,
                  }}
                >
                  Out of stock
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classes.addToCartBtn}
                  style={{
                    marginLeft: 20,
                    backgroundColor: '#D15B5B',
                    color: 'white',
                    height: 50,
                    borderRadius: 30,
                    padding: 20,
                  }}
                  size="small"
                  onClick={(e) => dispatch(addToCart(product._id, 1))}
                >
                  Add to card
                </Button>
              )}
            </div>
          </CardActions>
          <Item></Item>
        </Card>
      </Grid>
    </>
  );
}

export default Products;
