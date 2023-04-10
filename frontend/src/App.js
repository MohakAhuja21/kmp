import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Search from "./component/Product/Search.js";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UpdatePassword from "./component/User/UpdatePassword";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Wishlist from "./component/Cart/Wishlist.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import NewCoupon from "./component/Admin/NewCoupon.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import Loader from "./component/layout/Loader/Loader";
import PrescriptionManagement from "./component/Home/Prescription";
import Contact from "./component/Home/Contact";

const Products = React.lazy(() => import("./component/Product/Products"));
const ProductDetails = React.lazy(() =>
  import("./component/Product/ProductDetails")
);
const Cart = React.lazy(() => import("./component/Cart/Cart"));
const Home = React.lazy(() => import("./component/Home/Home"));
const LoginSignup = React.lazy(() => import("./component/User/LoginSignup"));
const Dashboard = React.lazy(() => import("./component/Admin/Dashboard"));
const Payment = React.lazy(() => import("./component/Cart/Payment"));
const Profile = React.lazy(() => import("./component/User/Profile"));

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/prescription" element={<PrescriptionManagement />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route
            path="/account"
            element={isAuthenticated ? <Profile /> : <LoginSignup />}
          />
          <Route
            path="/profile/update"
            element={isAuthenticated ? <UpdateProfile /> : <LoginSignup />}
          />
          <Route
            path="/password/update"
            element={isAuthenticated ? <UpdatePassword /> : <LoginSignup />}
          />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/wishlist"
            element={isAuthenticated ? <Wishlist /> : <LoginSignup />}
          />
          <Route
            path="/shipping"
            element={isAuthenticated ? <Shipping /> : <LoginSignup />}
          />
          <Route
            path="/order/confirm"
            element={isAuthenticated ? <ConfirmOrder /> : <LoginSignup />}
          />
          <Route
            path="/process/payment"
            element={isAuthenticated ? <Payment /> : <LoginSignup />}
          />
          <Route
            path="/success"
            element={isAuthenticated ? <OrderSuccess /> : <LoginSignup />}
          />
          <Route
            path="/orders"
            element={isAuthenticated ? <MyOrders /> : <LoginSignup />}
          />
          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated && user.role === "admin" ? (
                <Dashboard />
              ) : (
                <LoginSignup />
              )
            }
          />
          <Route
            path="/admin/products"
            element={
              isAuthenticated && user.role === "admin" ? (
                <ProductList />
              ) : (
                <LoginSignup />
              )
            }
          />
          <Route
            path="/admin/product"
            element={
              isAuthenticated && user.role === "admin" ? (
                <NewProduct />
              ) : (
                <LoginSignup />
              )
            }
          />
          <Route
            path="/admin/coupon"
            element={
              isAuthenticated && user.role === "admin" ? (
                <NewCoupon />
              ) : (
                <LoginSignup />
              )
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              isAuthenticated && user.role === "admin" ? (
                <UpdateProduct />
              ) : (
                <LoginSignup />
              )
            }
          />
          <Route
            path="/admin/orders"
            element={
              isAuthenticated && user.role === "admin" ? (
                <OrderList />
              ) : (
                <LoginSignup />
              )
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              isAuthenticated && user.role === "admin" ? (
                <ProcessOrder />
              ) : (
                <LoginSignup />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              isAuthenticated && user.role === "admin" ? (
                <UsersList />
              ) : (
                <LoginSignup />
              )
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              isAuthenticated && user.role === "admin" ? (
                <UpdateUser />
              ) : (
                <LoginSignup />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
