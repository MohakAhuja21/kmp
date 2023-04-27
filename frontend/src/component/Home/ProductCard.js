import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from "@material-ui/icons/Lock";
import { addItemsToCart } from "../../actions/cartAction";
import { toast } from "react-hot-toast";
import Button from "@mui/material/Button";

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (product.stock <= 0) {
      toast.error("This Item is currently out of stock.");
      return;
    }
    dispatch(addItemsToCart(product._id, 2)); // Always add 2 item to the cart when "Add to Cart" button is clicked
    toast.success("Item added to cart"); // Display success message when product is added to the cart
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div className="productCard__price">
        {isAuthenticated ? (
          <span>{`\u20B9${product.price}`}</span>
        ) : (
          <div className="productCard__login">
            <LockIcon />
          </div>
        )}
      </div>
      <Button
          variant="outlined"
          className="productCard__quantityButton"
          onClick={(e) => {
            e.preventDefault();
            addToCartHandler();
          }}
        >
          Add Item to Cart
        </Button>
    </Link>
  );
};

export default ProductCard;
