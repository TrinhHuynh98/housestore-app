import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Tooltip,
  MenuItem,
  Badge,
  InputAdornment,
  TextField,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { makeStyles, withStyles, createStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Service', path: '/service' },
  { name: 'Product', path: '/products' },
  { name: 'Blog', path: '/blog' },
  { name: 'About us', path: '/about-us' },
  { name: 'Contact', path: '/contact' },
];

const useStyles = makeStyles(() => ({
  linkStyle: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: '#1F3137',
  },
  tabHover: {
    '&:hover': {
      opacity: 0.5,
    },
  },
}));

const styles = (theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
});
function Header() {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenAdminMenu = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseAdminMenu = () => {
    setAnchorElAdmin(null);
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${name}`);
  };

  const routes = ['/', '/product', '/gallery', '/contact'];

  const location = useLocation();

  const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
  })(TextField);

  return (
    <>
      <AppBar
        className="sub-header-background"
        position="static"
        style={{ backgroundColor: '#1F3137' }}
      >
        <Container maxWidth="xl">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <form onSubmit={handleSubmit} className="row">
                <CssTextField
                  size="small"
                  id="custom-css-standard-input"
                  onChange={(e) => setName(e.target.value)}
                  className={styles.margin}
                  style={{ marginTop: 10, marginRight: 20 }}
                  InputProps={{
                    style: { color: 'white' },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ color: 'white' }}
                      >
                        <SearchIcon onClick={handleSubmit} />
                      </InputAdornment>
                    ),
                  }}
                />
              </form>

              <Toolbar disableGutters>
                {cartItems.length > 0 ? (
                  <Badge badgeContent={cartItems.length} color="success">
                    <Link to={'/cart'}>
                      <ShoppingCartOutlinedIcon style={{ color: 'white' }} />
                    </Link>
                  </Badge>
                ) : (
                  <Link to={'/cart'}>
                    <ShoppingCartOutlinedIcon style={{ color: 'white' }} />
                  </Link>
                )}
              </Toolbar>
            </div>
          </div>
        </Container>
      </AppBar>

      <AppBar style={{ backgroundColor: 'white' }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              className="header-text"
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              style={{ fontFamily: 'Chilanka' }}
            >
              <Link className={classes.linkStyle} to="/">
                House Store
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                className="header-text"
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <div>
                      <Link to={page.path} className={classes.linkStyle}>
                        {page.name}
                      </Link>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              className="header-text"
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              style={{ fontFamily: 'Chilanka' }}
            >
              <Link className={classes.linkStyle} to="/">
                House Store
              </Link>
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Tabs
                value={location.pathname}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#D15B5B',
                  },
                }}
              >
                <Tab
                  value={routes[0]}
                  label="Home"
                  component={Link}
                  to={routes[0]}
                  className={classes.tabHover}
                  style={{ color: '#1F3137' }}
                />
                <Tab
                  value={routes[1]}
                  label="Product"
                  component={Link}
                  to={routes[1]}
                  className={classes.tabHover}
                  style={{ color: '#1F3137' }}
                />
                <Tab
                  value={routes[2]}
                  label="Gallery"
                  component={Link}
                  to={routes[2]}
                  className={classes.tabHover}
                  style={{ color: '#1F3137' }}
                />
                <Tab
                  value={routes[3]}
                  label="Contact"
                  component={Link}
                  to={routes[3]}
                  className={classes.tabHover}
                  style={{ color: '#1F3137' }}
                />
              </Tabs>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Tooltip title="User Setting">
                {userInfo ? (
                  <Typography
                    style={{
                      borderRadius: 20,
                      padding: 10,
                      color: 'black',
                      cursor: 'pointer',
                      backgroundColor: 'pink',
                    }}
                    onClick={handleOpenUserMenu}
                  >
                    {userInfo.name}
                  </Typography>
                ) : (
                  <Link to="/signin" className={classes.linkStyle}>
                    <Typography
                      textAlign="center"
                      style={{
                        display: 'inline',
                        backgroundColor: '#1F3137',
                        borderRadius: 30,
                        padding: 15,
                        color: 'white',
                      }}
                    >
                      Sign In
                    </Typography>
                  </Link>
                )}
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link className={classes.linkStyle} to="/profile">
                    <Typography textAlign="center">User Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    signoutHandler();
                  }}
                >
                  <Link to="#" className={classes.linkStyle}>
                    <Typography textAlign="center">Sign out</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/orderhistory" className={classes.linkStyle}>
                    <Typography textAlign="center">Order History</Typography>
                  </Link>
                </MenuItem>
              </Menu>

              {userInfo && userInfo.isAdmin && (
                <>
                  <Tooltip title="User Setting">
                    <Typography
                      style={{
                        color: 'black',
                        marginLeft: 15,
                        cursor: 'pointer',
                      }}
                      onClick={handleOpenAdminMenu}
                    >
                      Admin
                    </Typography>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElAdmin}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElAdmin)}
                    onClose={handleCloseAdminMenu}
                  >
                    <MenuItem onClick={handleCloseAdminMenu}>
                      <Link to="/dashboard" className={classes.linkStyle}>
                        <Typography textAlign="center">Dashboard</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/productlist" className={classes.linkStyle}>
                        <Typography textAlign="center">Products</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/orderlist" className={classes.linkStyle}>
                        <Typography textAlign="center">Orders</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/userlist" className={classes.linkStyle}>
                        <Typography textAlign="center">Users</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/support" className={classes.linkStyle}>
                        <Typography textAlign="center">Support</Typography>
                      </Link>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Header;
