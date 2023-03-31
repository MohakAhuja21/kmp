import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <span>{`\u20B9${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
