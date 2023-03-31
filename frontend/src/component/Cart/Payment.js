import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { toast } from "react-hot-toast";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};


const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  console.log('orderInfo.totalPrice:', orderInfo.totalPrice);
  const amount = Math.round(orderInfo.totalPrice);
  console.log("amount:", amount);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    discount: orderInfo.discount,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
  
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/v1/payment/process",
        { amount: amount },
        config
      );
  
      console.log("data:", data);
  
      // Load the Razorpay script before initializing it
      const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay script");
      }
  
      const options = {
        key: "rzp_test_muoPW9MmgPxMRO",
        amount: amount * 100,
        currency: data.currency,
        name: "Kamal Medicos Pharma",
        description: "Payment for the order",
        image: "/logo192.png",
        order_id: data.id,
        handler: async (response) => {
          try {
            order.paymentInfo = {
              id: response.razorpay_payment_id,
              status: "succeeded",
            };
            dispatch(createOrder(order));
            navigate("/success");
          } catch (error) {
            console.error(error);
            toast.error("There's some issue while processing payment ");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phone,
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response?.data?.message || error.message);
    }
  };
  

  useEffect(() => {
    console.log("useEffect called");
    if (error) {
      console.log("Error:", error);
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  console.log("Rendering Payment component");

  return (
    <Fragment>
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <div className="paymentBox">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice?.toFixed(2)}`}
              ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};



export default Payment;
