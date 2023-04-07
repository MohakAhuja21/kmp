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

  const [quantity, setQuantity] = useState(4);

  const increaseQuantity = () => {
    if (product.stock <= quantity + 1) {
      toast.error(
        `We currently have ${product.stock} in stock.\n If you want more, please wait. Sorry for the inconvenience.\n Else wishlist and we will notify you!`
      );
      return;
    }
    const qty = quantity + 2; // add 2 to the current quantity
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 4) {
      toast.error("Quantity cannot be less than 4.");
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");

    // scroll to similar products if the ref exists
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
                <h2 style={{ marginTop: "15px" }}>{product.name}</h2>
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

                {product.packaging && (
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(54, 54, 54, 0.868)",
                    }}
                  >
                    <b>Packaging</b>:&nbsp;
                    {product.packaging}
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
                            top: "2px",
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
                    <input readOnly type="number" value={quantity} />
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
                    style={{ marginLeft: "6px", fontSize: "20px" }}
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
                <p style={{ marginTop: "8px", fontSize: "19px" }}>
                  {product.description}
                </p>
              </div>
              <div className="similarProduct__box">
                {similarProducts.length > 0 && (
                  <>
                    <h3>
                      Similar products:{" "}
                      <span
                        style={{
                          fontWeight: "normal",
                          backgroundColor: "whitesmoke",
                          paddingLeft: "0.2rem",
                          fontSize: "14px",
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
                              <p>₹{similarProduct.price}</p>
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
                    <h3>
                      Recommended Substitute
                      <RecommendIcon style={{ color: "#082b79" }} />
                    </h3>
                    {percentageCheaper && (
                      <p style={{ marginTop: "2px" }}>
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
                              <h4>₹{substituteProduct.price}</h4>
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
