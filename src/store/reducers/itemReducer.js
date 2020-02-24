import {
  FETCH_ITEM_START,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAIL,
  ADD_ITEM,
  ADD_ITEM_SUCCESS
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
    case ADD_ITEM:
      return {
        isLoading: true,
        error: null
      };
    case ADD_ITEM_SUCCESS:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}
