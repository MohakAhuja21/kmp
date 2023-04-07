import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/Metadata";
import LockIcon from "@material-ui/icons/Lock";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <MetaData title="Cart" />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Price</p>
            </div>

            {cartItems &&
              cartItems.map((item, index) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">
                    {isAuthenticated ? (
                      `₹${(item.price * item.quantity).toFixed(2)}`
                    ) : (
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                        className="cartSubtotal__login"
                      >
                        <LockIcon style={{color:"#051b4cee"}} />
                      </div>
                    )}
                  </p>
                </div>
              ))}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                {isAuthenticated ? (
                  <p>{`₹${cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}`}</p>
                ) : (
                  <div>
                    <LockIcon
                      style={{ color: "#051b4cee", marginLeft: "5px" }}
                    />
                  </div>
                )}
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Order Now</button>
              </div>
            </div>
            <div className="offer-section">
              <div className="offer-header" onClick={toggleSection}>
                <h3>Offers</h3>
                {isOpen ? (
                  <span className="close-icon">-</span>
                ) : (
                  <span className="open-icon">+</span>
                )}
              </div>
              {isOpen && (
                <div className="offer-content">
                  <ul>
                    <li>Free shipping on orders above 100.</li>
                    <li>Apply Coupon Code on checkout.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
