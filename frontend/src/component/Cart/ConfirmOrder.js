import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { toast } from "react-hot-toast";
import { getAllCoupons } from "../../actions/couponAction";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const { loading, error, success, coupons } = useSelector(
    (state) => state.coupon
  );
  const [couponCode, setCouponCode] = useState(
    localStorage.getItem("couponCode") || ""
  );
  const [discount, setDiscount] = useState(
    localStorage.getItem("discount") || ""
  );
  const [appliedCoupon, setAppliedCoupon] = useState(
    localStorage.getItem("appliedCoupon") || null
  );

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("couponCode", couponCode);
    localStorage.setItem("discount", discount);
    localStorage.setItem("appliedCoupon", appliedCoupon);
  }, [couponCode, discount, appliedCoupon]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const coupon = coupons.find((c) => c.code === couponCode);
    if (!coupon) {
      toast.error("Invalid coupon code");
    } else if (coupon.expiry && coupon.expiry < new Date()) {
      toast.error("This coupon has expired");
    }
    else if (coupon.usageLimit && coupon.usageLimit <= coupon.usageCount) {
      toast.error("This coupon has exceeded its usage limit");
    }
    else if (coupon.minimumOrderAmount && subtotal < coupon.minimumOrderAmount) {
      toast.error(`This coupon requires a minimum order amount of ${coupon.minimumOrderAmount}`);
    }
    else {
      setDiscount(coupon.discount);
      setAppliedCoupon(coupon);
      toast.success("Coupon applied successfully");
    }
    if (couponCode === "") {
      setDiscount("");
      setAppliedCoupon(null);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  
  const shippingCharges = subtotal < 100 ? 5 : 0;
  
  const totalPrice = subtotal + shippingCharges - (appliedCoupon ? (discount / 100) * subtotal : 0);  

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      discount,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  }

  const couponName = "health"; // specify the coupon name here

  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(couponName);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // reset copied state after 1.5 seconds
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography style={{fontWeight: 'bold'}}>Your Cart Items</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div className="confirmCartBox" key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <h1>Order Summary</h1>
            <div className="orderSummaryNext">
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              {subtotal < 100 && (
                <div style={{ marginTop: "10px" }}>
                  <p>Delivery Charges:</p>
                  <span>
                    Please add items worth ₹{100 - subtotal} to unlock free
                    delivery
                  </span>
                </div>
              )}
              {subtotal >= 100 && (
                <div>
                  <p>Delivery Charges:</p>
                  <span>Free</span>
                </div>
              )}
            </div>

            <div className="couponSection">
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(event) => setCouponCode(event.target.value.toLowerCase())}
                />
                <button type="submit">Apply</button>
                {appliedCoupon && discount && (
                  <div className="alert alert-success">
                    Coupon applied successfully. Discount: {discount}%
                  </div>
                )}
              </form>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
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
  <div className="offer-content" style={{ display: "flex", alignItems: "center" }}>
    <div className="offer-text" style={{ flex: 1 }}>
      <p style={{ margin: 0 }}>Apply coupon code: {couponName}</p>
    </div>
    <button onClick={handleCopyClick}>
      {copied ? "Code copied!" : "Copy code"}
    </button>
  </div>
)}


              </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
