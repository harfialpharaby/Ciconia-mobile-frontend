import {
  FETCH_ITEM_START,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAIL,
  ADD_ITEM_SUCCESS
} from "../actionTypes";
import { AsyncStorage } from "react-native";

const BASE_URL = "http://35.197.153.118";

export function fetchItemList() {
  return async dispatch => {
    dispatch({
      type: FETCH_ITEM_START
    });

    const response = await fetch(`${BASE_URL}/items`);
    if (response.ok) {
      const items = await response.json();
      dispatch({ type: FETCH_ITEM_SUCCESS, items: items.reverse() });
    } else {
      dispatch({ type: FETCH_ITEM_FAIL });
    }
  };
}

export function addItem(newItem, status) {
  return async dispatch => {
    try {
      const { name, price, quantity, image, city, country } = newItem;
      const imageUris = image.uri.split("/");
      const sendData = {
        name,
        price: parseInt(price),
        quantity,
        location: `${city}, ${country}`,
        imageName: imageUris[imageUris.length - 1],
        base64: image.base64,
        status
      };
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify(sendData)
      });

      if (response.ok) {
        let newItem = await response.json();
        dispatch({ type: ADD_ITEM_SUCCESS, newItem });
      }
    } catch (error) {
      console.log(error, "ERROR====================");
    }
  };
}

export function addBulkItems(newItems, status) {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const promises = newItems.reduce(
        (acc, { quantity, image, name, country, city, price }) => {
          let imageUris = image.uri.split("/");
          acc.push(
            fetch(`${BASE_URL}/items`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token
              },
              body: JSON.stringify({
                name,
                price: parseInt(price),
                quantity,
                location: `${city}, ${country}`,
                imageName: imageUris[imageUris.length - 1],
                base64: image.base64,
                status
              })
            })
          );
          return acc;
        },
        []
      );

      const responses = await Promise.all(promises);
      responses.forEach(async response => {
        if (response.ok) {
          let newItem = await response.json();
          dispatch({ type: ADD_ITEM_SUCCESS, newItem });
        }
      });
    } catch (error) {
      console.log(error, "ERROR====================");
    }
  };
}
