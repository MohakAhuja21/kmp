import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from "@material-ui/icons/Lock";
import { addItemsToCart } from "../../actions/cartAction";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(2);
  const [addedToCart, setAddedToCart] = useState(false); // New state variable to track if product has been added to cart

  const increaseQuantity = () => {
    if (product.stock <= quantity + 1) {
      toast.error(
        `We currently have ${product.stock} in stock.\n If you want more, please wait. Sorry for the inconvenience.`
      );
      return;
    }
    const qty = quantity + 2;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 2) {
      toast.error("Quantity cannot be less than 2.");
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (product.stock <= 0) {
      toast.error("This Item is currently out of stock.");
      return;
    }
    dispatch(addItemsToCart(product._id, quantity));
    setAddedToCart(true); // Set addedToCart state variable to true when product is added to cart
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
        {addedToCart ? ( // Conditionally render + and - icons if product has been added to cart
          <div className="productCard__quantity">
            <button onClick={(e) => { e.preventDefault(); decreaseQuantity(); }}>-</button>
            <span>{quantity}</span>
            <button onClick={(e) => { e.preventDefault(); increaseQuantity(); }}>+</button>
          </div>
        ) : null}
        <button className="productCard__quantityButton" onClick={(e) => { e.preventDefault(); addToCartHandler(); }}>Add to Cart</button>
      </div>
    </Link>
  );
};

export default ProductCard;
