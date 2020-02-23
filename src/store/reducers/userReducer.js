import {
  AUTH_START,
  AUTH_FAIL,
  SIGN_IN,
  SIGN_OUT,
  RESTORE_TOKEN
} from "../actionTypes";

const initialState = {
  isLoading: false,
  userToken: null,
  error: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false
      };
    case SIGN_IN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false
      };
    case SIGN_OUT:
      return {
        ...state,
        userToken: null,
        isLoading: false
      };
    default:
      return state;
  }
}
