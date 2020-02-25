import {
  FETCH_ITEM_START,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAIL,
  ADD_ITEM_SUCCESS,
  ADD_BULK_ITEM_SUCCESS
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
        ...state,
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
        ...state,
        isLoading: false,
        error: action.err
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: [action.newItem, ...state.items]
      };
    case ADD_BULK_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: [...action.newItems, ...state.items]
      };
    default:
      return state;
  }
}
