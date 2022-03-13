import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Grid, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Layout/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '50px 50px 0 0',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function Contact() {
  const navigate = useNavigate();
  const classes = useStyles();
  const userSignin = useSelector((state) => state.userSignin);
  const { userinfo } = userSignin;
  return (
    <div>
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={6} sm={6} md={6} style={{ marginTop: 20 }}>
            <h3>Contact with us Now!</h3>
            <TextField
              required
              id="outlined-required"
              label="Your Name"
              defaultValue=""
              fullWidth
              className={{
                root: classes.root,
              }}
              style={{ marginTop: 10, marginBottom: 10, borderRadius: 20 }}
            />

            <TextField
              className={classes.tabField}
              required
              id="outlined-required"
              label="Your email"
              defaultValue=""
              fullWidth
              style={{ marginTop: 10, marginBottom: 10, borderRadius: 20 }}
            />

            <TextField
              id="outlined-multiline-static"
              label="Your message"
              multiline
              rows="4"
              variant="outlined"
              fullWidth
            />
            {userinfo ? (
              <>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#D15B5B',
                    marginTop: 10,
                  }}
                >
                  Submit
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#D15B5B',
                    marginTop: 10,
                  }}
                  onClick={() => navigate('/signin')}
                >
                  Submit
                </Button>
              </>
            )}
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            style={{ marginTop: 50, textAlign: 'center' }}
          >
            <img className="Header-logo" src="/images/giphy.gif" alt="Logo" />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}
