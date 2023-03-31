import {
  CREATE_PRESCRIPTION_REQUEST,
  CREATE_PRESCRIPTION_SUCCESS,
  CREATE_PRESCRIPTION_FAIL,
  GET_ADMIN_PRESCRIPTIONS_REQUEST,
  GET_ADMIN_PRESCRIPTIONS_SUCCESS,
  GET_ADMIN_PRESCRIPTIONS_FAIL,
  DELETE_PRESCRIPTION_REQUEST,
  DELETE_PRESCRIPTION_SUCCESS,
  DELETE_PRESCRIPTION_FAIL,
  GET_ALL_PRESCRIPTIONS_REQUEST,
  GET_ALL_PRESCRIPTIONS_SUCCESS,
  GET_ALL_PRESCRIPTIONS_FAIL,
} from "../constants/prescriptionConstant";

const initialState = {
  prescriptions: [],
  loading: false,
  error: null,
  success: false, // Add success field to initial state
};

export const prescriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRESCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
      case CREATE_PRESCRIPTION_SUCCESS:
        return {
          ...state,
          prescriptions: [...state.prescriptions, action.payload],
          loading: false,
          error: null,
          success: true, // Set success to true
        };      
    case CREATE_PRESCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ADMIN_PRESCRIPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ADMIN_PRESCRIPTIONS_SUCCESS:
      return {
        ...state,
        prescriptions: action.payload,
        loading: false,
        error: null,
      };
    case GET_ADMIN_PRESCRIPTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRESCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        prescriptions: state.prescriptions.filter(
          (prescription) => prescription._id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case DELETE_PRESCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ALL_PRESCRIPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRESCRIPTIONS_SUCCESS:
      return {
        ...state,
        prescriptions: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_PRESCRIPTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
