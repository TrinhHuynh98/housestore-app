import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Grid, TextField, Button, Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    [`& fieldset`]: {
      borderRadius: 30,
    },
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
              classes={{
                root: classes.root,
              }}
              style={{ marginTop: 10, marginBottom: 10, borderRadius: 30 }}
            />

            <TextField
              classes={{
                root: classes.root,
              }}
              required
              id="outlined-required"
              label="Your email"
              defaultValue=""
              fullWidth
              style={{ marginTop: 10, marginBottom: 10, borderRadius: 30 }}
            />

            <TextField
              classes={{
                root: classes.root,
              }}
              id="outlined-multiline-static"
              label="Your message"
              multiline
              rows="4"
              variant="outlined"
              fullWidth
            />
            <div style={{ display: 'flex', margin: '0 auto' }}>
              <Button
                variant="link"
                color="default"
                className={classes.signInButton}
                startIcon={<FacebookIcon />}
                href="https://www.facebook.com/tr989898/"
              />
              <Button
                variant="link"
                color="default"
                className={classes.signInButton}
                startIcon={<InstagramIcon />}
                href="https://www.instagram.com/joslies98/"
              />
              <Button
                variant="link"
                color="default"
                className={classes.signInButton}
                startIcon={<LinkedInIcon />}
                href="https://www.linkedin.com/in/trinhhuynh98/"
              />
            </div>
            {userinfo ? (
              <>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#1F3137',
                    borderRadius: 30,
                    pading: 20,
                    color: 'white',
                    margin: '0 auto',
                    display: 'flex',
                    marginBottom: 10,
                    marginTop: 20,
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
                    backgroundColor: '#1F3137',
                    borderRadius: 30,
                    pading: 20,
                    color: 'white',
                    margin: '0 auto',
                    display: 'flex',
                    marginBottom: 10,
                    marginTop: 20,
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
