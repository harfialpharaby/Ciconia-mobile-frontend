import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchCartList } from "../store/actions/carts";
import SplashScreen from "./SplashScreen";

export default function CartListScreen(props) {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, carts, error } = useSelector(state => state.carts);
  const dispatch = useDispatch();
  // console.log(Object.keys(carts).length);
  // console.log(carts.open);
  // console.log(carts.offered);
  // console.log(carts.pendingPurchase);
  // console.log(carts.pendingDelivery);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    dispatch(fetchCartList()).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    dispatch(fetchCartList());
  }, []);

  return isLoading ? (
    <SplashScreen></SplashScreen>
  ) : !carts ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>No Carts Yet</Text>
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <FlatList
        data={carts}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
        keyExtractor={item => item._id}
      /> */}
      <Text>{JSON.stringify(carts)}</Text>
    </View>
  );
}
