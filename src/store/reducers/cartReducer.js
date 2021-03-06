import {
  FETCH_CART_START,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAIL,
  ADD_CART
} from "../actionTypes";

const initialState = {
  isLoading: false,
  carts: [],
  error: null
};

export default function travelReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CART_START:
      return {
        ...state,
        isLoading: true,
        carts: [],
        error: null
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carts: action.carts
      };
    case FETCH_CART_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ADD_CART:
      return {
        ...state,
        carts: [...state.carts, action.newCart],
        error: null
      };
    default:
      return state;
  }
}
