import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import SignInScreen from './screen/SignInScreen';
import RegisterScreen from './screen/RegisterScreen';
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import ProfileScreen from './screen/ProfileScreen';
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import PrivateRouter from './components/PrivateRouter';
import AdminRouter from './components/AdminRouter';
import ProductListScreen from './screen/ProductListScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import OrderListScreen from './screen/OrderListScreen';
import UserListScreen from './screen/UserListScreen';
import Header from './components/Layout/Header';
import SearchScreen from './screen/SearchScreen';
import DashboardScreen from './screen/DashboardScreen';
import SupportScreen from './screen/SupportScreen';
import ChartBox from './components/ChartBox';
import { useSelector } from 'react-redux';
import ProductPage from './screen/ProductPage';
import GalleryScreen from './screen/GalleryScreen';
import Contact from './screen/Contact';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/gallery" element={<GalleryScreen />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/profile"
            element={
              <PrivateRouter>
                <ProfileScreen />
              </PrivateRouter>
            }
          />
          <Route path="/orderhistory" element={<OrderHistoryScreen />} />
          <Route
            path="/productlist"
            element={
              <AdminRouter>
                <ProductListScreen />
              </AdminRouter>
            }
            exact
          />
          <Route
            path="/dashboard"
            element={
              <AdminRouter>
                <DashboardScreen />
              </AdminRouter>
            }
          />
          <Route path="/product/:id/edit" element={<ProductEditScreen />} />
          <Route
            path="/orderlist"
            element={
              <AdminRouter>
                <OrderListScreen />
              </AdminRouter>
            }
            exact
          />
          <Route
            path="/userlist"
            element={
              <AdminRouter>
                <UserListScreen />
              </AdminRouter>
            }
          />
          <Route
            path="/support"
            element={
              <AdminRouter>
                <SupportScreen />
              </AdminRouter>
            }
          />
          <Route path="/search/:name" element={<SearchScreen />} exact></Route>
          <Route
            path="/search/category/:category"
            element={<SearchScreen />}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            element={<SearchScreen />}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            element={<SearchScreen />}
            exact
          ></Route>
        </Routes>

        <div>
          {userInfo && !userInfo.isAdmin && <ChartBox userInfo={userInfo} />}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
