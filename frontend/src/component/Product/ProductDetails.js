import { Link, useParams } from "react-router-dom";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProduct,
  getProductDetails,
} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { addItemsToCart } from "../../actions/cartAction";
import { createwishlist } from "../../actions/wishlistAction";
import MetaData from "../layout/Metadata";
import { toast } from "react-hot-toast";
import RecommendIcon from "@mui/icons-material/Recommend";
import LockIcon from "@material-ui/icons/Lock";
import Confetti from "react-confetti";

const ProductDetails = () => {
  const similarProductsRef = useRef(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { error: werror } = useSelector((state) => state.wishlist);
  const param = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [similarProducts, setSimilarProducts] = useState([]);
  const [substituteProducts, setSubstituteProducts] = useState([]);
  const [percentageCheaper, setPercentageCheaper] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);

  useEffect(() => {
    dispatch(getProductDetails(id)).then((data) => {
      // Set the similar and substitute products data
      setSimilarProducts(data.similarProducts);
      setPercentageCheaper(data.percentageCheaper);
      setSubstituteProducts(data.substituteProducts);
    });

    dispatch(getProduct());

    window.scrollTo(0, 0);

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, id, error]);

  const [quantity, setQuantity] = useState(2);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);

    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    } else {
      setQuantity(""); // Clear the input field if the entered value is not a valid number
    }
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity + 1) {
      toast.error(
        `We currently have ${product.stock} in stock.\n If you want more, please wait. Sorry for the inconvenience.\n Else wishlist and we will notify you!`
      );
      return;
    }
    const qty = quantity + 1; // add 2 to the current quantity
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (quantity === "" || quantity === 0) {
      toast.error("Quantity should not be left blank or 0.");
      return;
    }

    dispatch(addItemsToCart(id, quantity));

    // Array of unique IDs
    const uniqueIds = [
      "6479cbf53fdabf22e0e7013b",
      "644e006eb9e1261b11398bee",
      "644e0165b9e1261b11398df5",
      "649549f0c7f3af9f33395be8",
      "64954affdceca8330a8f60e9",
    ];

    // Check if the added product has a unique ID
    if (uniqueIds.includes(id)) {
      toast.success("Offer product added to cart!");
      setIsProductAdded(true);
      // Show the confetti animation and notification for a few seconds
      setTimeout(() => {
        setIsProductAdded(false);
      }, 4000);
    } else {
      toast.success("Item added to cart!");
    }

    // Scroll to similar products if the ref exists
    if (similarProductsRef && similarProductsRef.current) {
      similarProductsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const {
    loading: userloading,
    user,
    isAuthenticated,
  } = useSelector((state) => state.user);

  const addtowishlist = () => {
    if (user) {
      const option = {
        user: user._id,
        orderItems: [{ product: param.id }],
      };
      console.log(option);
      dispatch(createwishlist(option));
      toast.success("Product added in wishlist");
    } else {
      toast.error("Login to add Product into Wishlist");
    }
  };

  const handleClick = () => {
    setShowMessage(true);
    toast.error("Please login/register to view.");
  };

  return (
    <Fragment>
      {isProductAdded && (
        <div className="confetti-container" style={{ pointerEvents: "none" }}>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Products / ${product.name}`} />
          <div className="ProductDetails">
            <Carousel className="productDetails_img_con">
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
            <div className="productDetails_con">
              <div className="detailsBlock-1">
                <h2 style={{ marginTop: "15px", fontSize:"16px" }}>{product.name}</h2>
                {product.packaging && (
                  <p
                    style={{
                      fontSize: "10px",
                      marginBottom: "2px",
                      marginTop: "1px",
                    }}
                  >
                    <b>Packaging</b>:&nbsp;
                    {product.packaging}
                  </p>
                )}
                {product.manufacturer && (
                  <p>
                    <b>Manufacturer</b>:&nbsp;
                    {product.manufacturer}
                  </p>
                )}

                {product.salt_composition && (
                  <p>
                    <b>Composition</b>:&nbsp;
                    {product.salt_composition}
                  </p>
                )}
              </div>
              <div className="detailsBlock-3">
                <div className="price-container">
                  <>
                    <h1 className="selling-price">
                      Selling Price:{" "}
                      {isAuthenticated ? (
                        <span>
                          {`₹${product.price}`}
                          {product.unit && (
                            <sup
                              style={{
                                color: "rgba(0, 0, 0, 0.593)",
                                fontSize: "12px",
                              }}
                            >
                              ({product.unit})
                            </sup>
                          )}
                        </span>
                      ) : (
                        <LockIcon
                          style={{
                            color: "red",
                            position: "relative",
                            bottom: "3px",
                            left: "2px",
                            cursor: "pointer",
                          }}
                          onClick={handleClick}
                        />
                      )}
                    </h1>
                  </>
                  <h2 className="mrp-price">
                    MRP: <span>{`₹${product.mrp}`}</span>
                  </h2>
                </div>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1" // Set the minimum value for the input
                    />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    className="addToCart_btn"
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                  <button className="wishlistButton" onClick={addtowishlist}>
                    WISHLIST
                  </button>
                </div>

                <p>
                  Status:
                  <b
                    style={{ marginLeft: "6px", fontSize: "22px" }}
                    className={product.stock < 1 ? "redColor" : "greenColor"}
                  >
                    {product.stock < 1 ? "Out Of Stock" : "InStock"}
                  </b>
                  <>
                    <h3 className="margin-price">
                      Margin:{" "}
                      {isAuthenticated ? (
                        <span>{`${Math.floor(
                          ((product.mrp - product.price) / product.mrp) * 100
                        )}%`}</span>
                      ) : (
                        <LockIcon
                          style={{
                            color: "red",
                            position: "relative",
                            top: "5px",
                            cursor: "pointer",
                          }}
                          onClick={handleClick}
                        />
                      )}
                    </h3>
                  </>
                </p>
              </div>

              <div className="detailsBlock-4">
                <b
                  style={{
                    borderBottom: "2px solid #FFBF00",
                    fontSize: "21px",
                  }}
                >
                  Description
                </b>
                :
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                    letterSpacing: "1px",
                    marginInline: "4px",
                  }}
                >
                  {product.description}
                </p>
              </div>
              <div className="similarProduct__box">
                {similarProducts.length > 0 && (
                  <>
                    <h3 style={{fontSize: "14px"}}>
                      Similar Products:{" "}
                      <span
                        style={{
                          fontWeight: "normal",
                          backgroundColor: "whitesmoke",
                          paddingLeft: "0.1rem",
                          fontSize: "13px",
                          letterSpacing: "1px",
                        }}
                      >
                        {product.category}
                      </span>
                    </h3>
                    <div className="similarProducts" ref={similarProductsRef}>
                      {similarProducts.map((similarProduct) => (
                        <div
                          className="shop__pro_recom"
                          style={{ marginTop: "15px" }}
                          key={similarProduct._id}
                        >
                          <Link
                            to={`/product/${similarProduct._id}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            <img
                              src={similarProduct.images[0].url}
                              alt="similar product image"
                            />
                            <div className="shop__des_reco">
                              <h5>{similarProduct.name}</h5>
                              {isAuthenticated ? (
                                <p>₹{similarProduct.price}</p>
                              ) : null}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="similarProduct__box">
                {substituteProducts.length > 0 && (
                  <>
                    <h3 style={{fontSize: '15px'}}>
                      Recommended Substitute
                      <RecommendIcon style={{ color: "#082b79", fontSize:"2rem"}} />
                    </h3>
                    {percentageCheaper && (
                      <p style={{ marginTop: "2px", fontSize:"13px" }}>
                        This product is{" "}
                        <b className="substitute__medPrice">
                          {percentageCheaper}% cheaper
                        </b>
                        .
                      </p>
                    )}
                    <div
                      className="similarProducts similarProductsSubs"
                      ref={similarProductsRef}
                    >
                      {substituteProducts.map((substituteProduct) => (
                        <div
                          className="shop__pro_recom"
                          style={{ marginTop: "15px" }}
                          key={substituteProduct._id}
                        >
                          <Link
                            to={`/product/${substituteProduct._id}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            <img
                              src={substituteProduct.images[0].url}
                              alt="substitute product image"
                            />
                            <div className="shop__des_reco">
                              <h5>{substituteProduct.name}</h5>
                              {isAuthenticated ? (
                                <h4>₹{substituteProduct.price}</h4>
                              ) : null}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
