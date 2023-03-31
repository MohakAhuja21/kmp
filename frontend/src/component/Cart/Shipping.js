import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import { toast } from "react-hot-toast";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('DL');
  const [country, setCountry] = useState('IN');
  const [pincode, setPinCode] = useState('110008');  

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pincode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
