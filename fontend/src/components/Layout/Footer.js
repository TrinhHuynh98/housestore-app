import { AppBar, Container, Box, Grid, TextField, Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';

const useStyles = makeStyles({
  linkStyle: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'white',
  },
  buttonHover: {
    '&:hover': {
      transform: 'scale(1.3)',
    },
  },
  socialIcon: {
    color: 'white',
    marginTop: 20,
    marginRight: 10,
    height: 30,
    width: 30,
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: '#1F3137', marginTop: 20 }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FacebookIcon className={classes.socialIcon} />
          <TwitterIcon className={classes.socialIcon} />
          <InstagramIcon className={classes.socialIcon} />
          <GitHubIcon className={classes.socialIcon} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <h3 style={{ marginRight: 20 }}>Sign up for our newletter</h3>
          <TextField
            id="standard-basic"
            label="Your email"
            type="text"
            style={{ marginRight: 20 }}
            inputProps={{
              color: 'white',
              border: ' solid 1px white',
            }}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: '#1F3137',
              color: 'white',
              border: 'solid 1px white',
            }}
            className={classes.buttonHover}
          >
            Subscribes
          </Button>
        </div>

        <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={3} sm={3} md={3} style={{ marginTop: 20 }}>
              COMPANY NAME
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </Grid>
            <Grid item xs={3} sm={3} md={3} style={{ marginTop: 20 }}>
              PRODUCT
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                <Link className={classes.linkStyle} to="/">
                  Chair
                </Link>
              </p>
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                <Link className={classes.linkStyle} to="/">
                  Cabinet
                </Link>
              </p>
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                <Link className={classes.linkStyle} to="/">
                  Beds
                </Link>
              </p>
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                <Link className={classes.linkStyle} to="/">
                  Clock
                </Link>
              </p>
            </Grid>
            <Grid item xs={3} sm={3} md={3} style={{ marginTop: 20 }}>
              USEFUL LINK
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                <Link className={classes.linkStyle} to="/cart">
                  Cart
                </Link>
              </p>
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                <Link className={classes.linkStyle} to="/products">
                  Product
                </Link>
              </p>
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                <Link className={classes.linkStyle} to="/about-us">
                  About us
                </Link>
              </p>
            </Grid>
            <Grid item xs={3} sm={3} md={3} style={{ marginTop: 20 }}>
              CONTACT
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                <HomeOutlinedIcon /> Binh Thanh, Ho Chi Minh city
              </p>
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                <LocalPhoneOutlinedIcon /> + 01 234 567 88
              </p>
              <p style={{ textAlign: 'left', fontSize: 14 }}>
                <EmailOutlinedIcon /> @sos9889yo@gmail.com
              </p>
            </Grid>
          </Grid>
        </Box>
        <h3 style={{ textAlign: 'center' }}>© 2022 Nailbeauty</h3>
      </Container>
    </AppBar>
  );
}
