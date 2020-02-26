import { AsyncStorage } from "react-native";
import {
  FETCH_CART_START,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAIL
} from "../actionTypes";
import { BASE_URL } from "../../url";

export function fetchCartList() {
  return async dispatch => {
    dispatch({
      type: FETCH_CART_START
    });

    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/carts/user`, {
        headers: {
          token: userToken
        }
      });
      if (response.ok) {
        const carts = await response.json();
        const normalizedCarts = [];
        for (const key in carts) {
          normalizedCarts.push(...carts[key]);
        }

        dispatch({ type: FETCH_CART_SUCCESS, carts: normalizedCarts });
      } else {
        dispatch({ type: FETCH_CART_FAIL });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_CART_FAIL, error });
    }
  };
}

export function addCart({ travelId, itemId, quantity, status, fixPrice }) {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify({
          travelId,
          itemId,
          quantity,
          status,
          fixPrice
        })
      });
      if (response.ok) {
        const newCart = await response.json();
      } else {
        console.log("GAGAL");
      }
    } catch (error) {
      console.log(error, "ERROR====================");
    }
  };
}
