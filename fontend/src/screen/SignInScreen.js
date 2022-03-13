import React, { useState, useEffect } from 'react';
import { FormControl, TextField, Grid, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { Helmet } from 'react-helmet-async';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  textField: {
    borderRadius: '50%',
    border: 'solid 1px white',
  },
});

export default function SignInScreen() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '30vh' }}
      >
        <h2 style={{ textAlign: 'center' }}>Sign in</h2>

        {loading && <LoadingBox></LoadingBox>}
        {error && <Messagebox>{error}</Messagebox>}

        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="outlined-basic"
            label="Email"
            defaultValue=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={classes.textField}
            fullWidth
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={classes.textField}
            fullWidth
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#1F3137',
              color: 'white',
              borderRadius: 10,
            }}
            onClick={submitHandler}
          >
            Sign In
          </Button>
        </FormControl>
        <Link
          to={`/register?redirect=${redirect}`}
          style={{ textDecoration: 'none' }}
        >
          Create new account
        </Link>
      </Grid>
    </>
  );
}
