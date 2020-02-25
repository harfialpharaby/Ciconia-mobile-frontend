import {
  AUTH_START,
  AUTH_FAIL,
  SIGN_IN,
  SIGN_OUT,
  RESTORE_TOKEN,
  MY_PROFILE,
  LOADING_MY_PROFILE
} from "../actionTypes";

const initialState = {
  isLoading: false,
  loadingProfile: false,
  userToken: null,
  myProfile: null,
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
        isLoading: false,
        userToken: action.token
      };
    case SIGN_IN:
      return {
        ...state,
        isLoading: false,
        userToken: action.token
      };
    case LOADING_MY_PROFILE:
      return {
        ...state,
        loadingProfile: true,
        myProfile: null,
        error: null
      };
    case MY_PROFILE:
      return {
        ...state,
        loadingProfile: false,
        myProfile: action.myProfile
      };
    case SIGN_OUT:
      return {
        ...state,
        isLoading: false,
        userToken: null
      };
    default:
      return state;
  }
}
