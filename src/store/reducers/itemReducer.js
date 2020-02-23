import {
  FETCH_ITEM_START,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAIL
} from "../actionTypes";

const initialState = {
  isLoading: false,
  items: [],
  error: null
};

export default function travelReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEM_START:
      return {
        isLoading: true,
        items: [],
        error: null
      };
    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.items
      };
    case FETCH_ITEM_FAIL:
      return {
        isLoading: false,
        error: action.err
      };
    default:
      return state;
  }
}
