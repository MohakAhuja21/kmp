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

const initialState = {
  coupons: [],
  error: null,
  loading: false,
  success: false,
};

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CREATE_COUPON:
    case REQUEST_GET_ALL_COUPONS:
    case REQUEST_DELETE_COUPON:
      return { ...state, loading: true, success: false };

    case SUCCESS_CREATE_COUPON:
      return {
        ...state,
        coupons: [...state.coupons, action.payload],
        loading: false,
        success: true,
      };

    case SUCCESS_GET_ALL_COUPONS:
      return {
        ...state,
        coupons: action.payload,
        loading: false,
        success: true,
      };

    case SUCCESS_DELETE_COUPON:
      return {
        ...state,
        coupons: state.coupons.filter(
          (coupon) => coupon._id !== action.payload
        ),
        loading: false,
        success: true,
      };

    case FAIL_CREATE_COUPON:
    case FAIL_GET_ALL_COUPONS:
    case FAIL_DELETE_COUPON:
      return { ...state, error: action.payload, loading: false };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
