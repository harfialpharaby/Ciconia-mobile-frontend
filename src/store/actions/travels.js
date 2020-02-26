import { AsyncStorage } from "react-native";
import {
  FETCH_TRAVEL_START,
  FETCH_TRAVEL_SUCCESS,
  FETCH_TRAVEL_FAIL,
  ADD_TRAVEL_SUCCESS,
  MY_PROFILE
} from "../actionTypes";
import { addBulkItems } from "./items";

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

export function addTravel({ destination, departure, departureDate, items }) {
  return async dispatch => {
    try {
      const locationFrom = `${departure.city.trim()}, ${departure.country.trim()}`;
      const locationTo = `${destination.city.trim()}, ${destination.country.trim()}`;
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/travels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify({
          locationFrom,
          locationTo,
          departure: departureDate,
          itemList: []
        })
      });

      if (response.ok) {
        let newTravel = await response.json();
        dispatch({ type: ADD_TRAVEL_SUCCESS, newTravel });
        dispatch({ type: MY_PROFILE, myProfile: { travel: newTravel } });
        dispatch(addBulkItems(items, "travel"));
      } else {
        console.log("GAGAL");
      }
    } catch (error) {
      console.log(error, "ERROR====================");
    }
  };
}
