import {
  FETCH_TRAVEL_START,
  FETCH_TRAVEL_SUCCESS,
  FETCH_TRAVEL_FAIL
} from "../actionTypes";

const BASE_URL = "http://35.197.153.118";

export function fetchTravelList() {
  return async dispatch => {
    dispatch({
      type: FETCH_TRAVEL_START
    });

    let response = await fetch(`${BASE_URL}/travels`);
    if (response.ok) {
      let travels = await response.json();
      dispatch({ type: FETCH_TRAVEL_SUCCESS, travels: travels.reverse() });
    } else {
      dispatch({ type: FETCH_TRAVEL_FAIL });
    }
  };
}
