import axios from "axios";
import {
  REQUEST_CREATE_COUPON,
  SUCCESS_CREATE_COUPON,
  FAIL_CREATE_COUPON,
  REQUEST_GET_ALL_COUPONS,
  SUCCESS_GET_ALL_COUPONS,
  FAIL_GET_ALL_COUPONS,
  REQUEST_DELETE_COUPON,
  SUCCESS_DELETE_COUPON,
  FAIL_DELETE_COUPON,
  CLEAR_ERRORS,
} from "../constants/couponConstant";

// Create Coupon
export const createCoupon = (coupon) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_CREATE_COUPON });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/coupons", coupon, config);

    dispatch({
      type: SUCCESS_CREATE_COUPON,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_CREATE_COUPON,
      payload: error.response.data.message,
    });
  }
};

export const getAllCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_ALL_COUPONS });

    const response = await axios.get("/api/v1/coupons");

    const data = response.data;

    dispatch({
      type: SUCCESS_GET_ALL_COUPONS,
      payload: data, 
    });
  } catch (error) {
    dispatch({
      type: FAIL_GET_ALL_COUPONS,
      payload: error.response.data.message,
    });
  }
};


// Delete Coupon
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_DELETE_COUPON });

    await axios.delete(`/api/v1/admin/coupon/${id}`);

    dispatch({
      type: SUCCESS_DELETE_COUPON,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: FAIL_DELETE_COUPON,
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
