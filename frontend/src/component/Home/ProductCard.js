import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useSelector } from "react-redux";
import LockIcon from "@material-ui/icons/Lock";

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      {isAuthenticated ? (
        <span>{`\u20B9${product.price}`}</span>
      ) : (
        <div style={{display:"flex", justifyContent: "flex-end"}} className="productCard__login">
          <LockIcon />
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
