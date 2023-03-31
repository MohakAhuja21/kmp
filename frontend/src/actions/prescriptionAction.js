import axios from "axios";
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

// Action to create a new prescription
export const createPrescription = (prescriptionData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRESCRIPTION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/create",
      prescriptionData,
      config
    );

    dispatch({
      type: CREATE_PRESCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRESCRIPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action to get all prescriptions (admin only)
export const getAdminPrescriptions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_PRESCRIPTIONS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/prescriptions");

    dispatch({
      type: GET_ADMIN_PRESCRIPTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_PRESCRIPTIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action to delete a prescription by ID (admin only)
export const deletePrescription = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRESCRIPTION_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/prescription/${id}`);

    dispatch({
      type: DELETE_PRESCRIPTION_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRESCRIPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action to get all prescriptions
export const getAllPrescriptions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRESCRIPTIONS_REQUEST });

    const response = await axios.get("/api/v1/allprescriptions");

    if (!response.data) {
      throw new Error("No data received from server");
    }

    dispatch({
      type: GET_ALL_PRESCRIPTIONS_SUCCESS,
      payload: response.data.prescriptions,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRESCRIPTIONS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

