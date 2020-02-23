import { AUTH_START, AUTH_FAIL, SIGN_IN, SIGN_OUT } from "../actionTypes";

const BASE_URL = "http://35.197.153.118";

export function userRegister({ email, name, password }) {
  return async dispatch => {
    dispatch({
      type: AUTH_START
    });

    console.log({ email, name, password });

    let response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, name, password })
    });
    if (response.ok) {
      let json = await response.json();
      dispatch({ type: SIGN_IN, token: json.token });
    } else {
      dispatch({ type: AUTH_FAIL });
    }
  };
}

export function userLogin({ email, password }) {
  return async dispatch => {
    dispatch({
      type: AUTH_START
    });

    let response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      let json = await response.json();
      dispatch({ type: SIGN_IN, token: json.token });
    } else {
      dispatch({ type: AUTH_FAIL });
    }
  };
}

export function signOut() {
  dispatch({ type: SIGN_OUT });
}

export async function signUp(data) {
  // In a production app, we need to send user data to server and get a token
  // We will also need to handle errors if sign up failed
  // After getting token, we need to persist the token using `AsyncStorage`
  // In the example, we'll use a dummy token

  dispatch({ type: SIGN_IN, token: "dummy-auth-token" });
}
