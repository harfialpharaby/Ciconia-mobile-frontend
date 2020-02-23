import {
  FETCH_TRAVEL_START,
  FETCH_TRAVEL_SUCCESS,
  FETCH_TRAVEL_FAIL
} from "../actionTypes";

const initialState = {
  isLoading: false,
  travels: [],
  error: null
};

export default function travelReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRAVEL_START:
      return {
        isLoading: true,
        travels: [],
        error: null
      };
    case FETCH_TRAVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travels: action.travels
      };
    case FETCH_TRAVEL_FAIL:
      return {
        isLoading: false,
        error: action.err
      };
    default:
      return state;
  }
}
