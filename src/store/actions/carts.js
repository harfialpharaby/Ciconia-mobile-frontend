import { AsyncStorage } from "react-native";
import {
  FETCH_CART_START,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAIL
} from "../actionTypes";

const BASE_URL = "http://35.197.153.118";

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
        let normalizedCarts = [];
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
