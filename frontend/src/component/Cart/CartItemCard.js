import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartItemCard = ({ item, deleteCartItems }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        {isAuthenticated ? (
          <span>{`Price: ₹${item.price}`}</span>
        ) : (
          <div style={{fontSize:"small", color:"red"}}>
          First Login
          </div>
        )}
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
