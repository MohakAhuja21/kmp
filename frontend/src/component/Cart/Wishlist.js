import React, { Fragment, useState, useEffect } from "react";
import "./Wishlist.css";
import { useSelector, useDispatch } from "react-redux";
import { deletewish, getwishlist } from "../../actions/wishlistAction";
import { loadUser, clearErrors } from "../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Typography } from "@material-ui/core";
import { toast } from "react-hot-toast";

function Wishlist() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const { wishlist, loading } = useSelector((state) => state.wishlist_data);
  const {
    isAuthenticated,
    loading: userloading,
    error,
    user,
  } = useSelector((state) => state.user);
  const [state, setstate] = useState(false);
  const [state1, setstate1] = useState(false);
  const [state2, setstate2] = useState(false);
  const { deletewish: dellll } = useSelector((state) => state.deletewish);

  function delwish(user, product) {
    const option = {
      product: product,
      user: user,
    };

    dispatch(deletewish(option));
    setstate2(false);
  }
  if (state2 === false && dellll === true) {
    dispatch(getwishlist(user._id));
    setstate2(true);
  }

  useEffect(() => {
    if (state1 === false) {
      if (!user) {
        dispatch(loadUser());
      }
      setstate1(true);
    }

    if (error) {
      dispatch(clearErrors());
    }
    if (state === false) {
      if (userloading === false) {
        if (isAuthenticated === false) {
          toast.error("Log in to access wishlist");
          setstate(true);
        } else {
          dispatch(getwishlist(user._id));
          setstate(true);
        }
      }
    }
  }, [dispatch, error,toast, userloading, isAuthenticated, user]);

  return (
    <Fragment>
      {loading === false && (
        <Fragment>
          {wishlist !== null && wishlist.orderItems.length > 0 ? (
            <Fragment>
              <div className="whishlistPage">
                <div className="breadcrumb">
                  <ul>
                    <li>Wishlist Items: {wishlist.orderItems.length}</li>
                  </ul>
                </div>
                <table className="whishlistTable">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist &&
                      wishlist.orderItems.map((pro) => (
                        <tr key={pro.product}>
                          <td>
                            <img
                              src={pro.product.images[0].url}
                              alt="Product"
                            />
                          </td>
                          <td>
                            <Link to={`/product/${pro.product._id}`}>
                              {pro.product.name}
                            </Link>
                          </td>
                          <td>
                            <span>
                            ₹
                              <b>{` ${pro.product.price}`}</b>
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => delwish(user._id, pro.product._id)}
                            >
                              Remove from Wishlist
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="wishlistEmpty">
                <Typography>Your Wishlist is Empty</Typography>
                <FavoriteBorderIcon />
                <Typography>
                  Add items that are out of stock, And you want to buy in future.
                </Typography>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Wishlist;
