import React, { useState } from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

const CartItemCard = ({ item, deleteCartItems }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveClick = () => {
    setIsRemoving(true);
    setTimeout(() => {
      deleteCartItems(item.product);
    }, 300); // Wait for the animation to complete before removing the item
  };

  return (
    <CSSTransition
      in={!isRemoving}
      timeout={300}
      classNames="cart-item-card"
      unmountOnExit
    >
      <div className="CartItemCard">
        <img src={item.image} alt="ssa" />
        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          {isAuthenticated ? (
            <span>{`Price: ₹${item.price}`}</span>
          ) : (
            <div style={{ fontSize: "small", color: "red" }}>First Login</div>
          )}
          <p onClick={handleRemoveClick}>Remove</p>
        </div>
      </div>
    </CSSTransition>
  );
};

export default CartItemCard;
