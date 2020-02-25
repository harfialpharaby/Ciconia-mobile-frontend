import { AsyncStorage } from "react-native";
import {
  AUTH_START,
  AUTH_FAIL,
  SIGN_IN,
  SIGN_OUT,
  MY_PROFILE,
  LOADING_MY_PROFILE
} from "../actionTypes";

const BASE_URL = "http://35.197.153.118";

export function fetchMyProfile() {
  return async dispatch => {
    dispatch({ type: LOADING_MY_PROFILE });
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        token
      }
    });
    if (response.ok) {
      const myProfile = await response.json();
      dispatch({ type: MY_PROFILE, myProfile });
    } else {
      dispatch({ type: MY_PROFILE, myProfile: { travel: null } });
    }
  };
}

export function userRegister({ email, name, password }) {
  return async dispatch => {
    dispatch({
      type: AUTH_START
    });

    try {
      let response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, name, password })
      });
      if (response.ok) {
        let json = await response.json();
        await AsyncStorage.setItem("userToken", json.token);
        AsyncStorage.setItem("name", json.name);
        AsyncStorage.setItem("point", json.point.toString());

        dispatch(fetchMyProfile());
        dispatch({ type: SIGN_IN, token: json.token });
      } else {
        dispatch({ type: AUTH_FAIL, error: "Email already registered" });
      }
    } catch (error) {
      dispatch({ type: AUTH_FAIL, error });
    }
  };
}

export function userLogin({ email, password }) {
  return async dispatch => {
    dispatch({
      type: AUTH_START
    });

    try {
      let response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        let json = await response.json();
        AsyncStorage.setItem("userToken", json.token);
        AsyncStorage.setItem("name", json.name);
        AsyncStorage.setItem("point", json.point.toString());

        dispatch(fetchMyProfile());
        dispatch({ type: SIGN_IN, token: json.token });
      } else {
        dispatch({ type: AUTH_FAIL });
      }
    } catch (error) {
      dispatch({ type: AUTH_FAIL, error });
    }
  };
}

export function signOut() {
  return async dispatch => {
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("name");
    AsyncStorage.removeItem("point");
    dispatch({ type: SIGN_OUT });
  };
}
