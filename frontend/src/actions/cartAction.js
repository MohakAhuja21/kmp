import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";
import axios from "axios";

// //Fetch Cart Items from API
// export const fetchCartItems = () => async (dispatch, getState) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const { data } = await axios.get("/api/v1/cart", config);

//   dispatch({
//     type: ADD_TO_CART,
//     payload: data.cartItems,
//   });
// };


//Add Items To Cart
export const addItemsToCart =
  (id, quantity, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        size,
        quantity,
      },
    });

  //   const { cartItems } = getState().cart;

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   await axios.post("/api/v1/cart", { cartItems }, config);

  //   localStorage.setItem(
  //     "cartItems",
  //     JSON.stringify(getState().cart.cartItems)
  //   );
  // };

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

//Remove from Cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
