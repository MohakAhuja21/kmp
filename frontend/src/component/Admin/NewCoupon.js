import React, { Fragment, useEffect, useState } from "react";
import "./newCoupon.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createCoupon,
  deleteCoupon,
  getAllCoupons,
} from "../../actions/couponAction";
import { Button } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SideBar from "./Sidebar";
import { NEW_COUPON_RESET } from "../../constants/couponConstant";
import { toast } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";

const NewCoupon = () => {
  const dispatch = useDispatch();
  const { loading, error, success, coupons } = useSelector(
    (state) => state.coupon
  );

  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [minimumOrderAmount, setMinimumOrderAmount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [oneTime, setOneTime] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({ type: NEW_COUPON_RESET });
      toast.success("Coupon Created Successfully");
    }
  }, [dispatch, error, success]);

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      dispatch(deleteCoupon(id));
    }
  };

  if (loading) {
    return <div>Loading coupons...</div>;
  }

  const createCouponSubmitHandler = (e) => {
    e.preventDefault();

    const couponData = {
      code,
      type,
      discount,
      expiry,
      minimumOrderAmount,
      usageLimit,
      oneTime,
    };

    dispatch(createCoupon(couponData));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newCouponContainer">
          <form
            className="createCouponForm"
            onSubmit={createCouponSubmitHandler}
          >
            <h1>Create Coupon</h1>

            <div>
              <input
                type="text"
                placeholder="Coupon Code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select Coupon Type</option>
                <option value="percentage">Percentage Discount</option>
              </select>
            </div>

            <div>₹
              <input
                type="number"
                placeholder="Discount"
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <input
                type="date"
                placeholder="Expiry Date"
                required
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Min Order Price"
                required
                value={minimumOrderAmount}
                onChange={(e) => setMinimumOrderAmount(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Usage Limit"
                required
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
              />
            </div>

            <div>
              <input
                type="checkbox"
                id="oneTime"
                name="oneTime"
                value={oneTime}
                onChange={() => setOneTime(!oneTime)}
              />
              <label htmlFor="oneTime">One Time Use Only</label>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Create
            </Button>
          </form>
        </div>
        <div>
          {coupons.length === 0 ? (
            <p>No coupons found.</p>
          ) : (
            coupons.map((coupon) => (
              <div key={coupon.id}>
                <p>Coupon Code: {coupon.code}</p>
                <p>minimumOrderAmount: {coupon.minimumOrderAmount}</p>
                <p>Discount: {coupon.discount}</p>
                <p>
                  Expiration Date:{" "}
                  {new Date(coupon.expiry).toLocaleDateString("en-GB")}
                </p>
                <Button
                  style={{ marginBottom: "10px", marginTop: "2px" }}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(coupon._id)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default NewCoupon;
