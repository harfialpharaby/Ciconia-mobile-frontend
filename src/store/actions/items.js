import {
  FETCH_ITEM_START,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAIL
} from "../actionTypes";

const BASE_URL = "http://35.197.153.118";

export function fetchItemList() {
  return async dispatch => {
    dispatch({
      type: FETCH_ITEM_START
    });

    let response = await fetch(`${BASE_URL}/items`);
    if (response.ok) {
      let items = await response.json();
      dispatch({ type: FETCH_ITEM_SUCCESS, items });
    } else {
      dispatch({ type: FETCH_ITEM_FAIL });
    }
  };
}
