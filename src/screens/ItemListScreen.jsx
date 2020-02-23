import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";

import { fetchItemList } from "../store/actions/items";
import ItemCard from "../components/ItemCard";
import SplashScreen from "./SplashScreen";

export default function CartListScreen(props) {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, items, error } = useSelector(state => state.items);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    dispatch(fetchItemList()).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    dispatch(fetchItemList());
  }, []);

  return isLoading ? (
    <SplashScreen></SplashScreen>
  ) : !items.length ? (
    <View style={styles.container}>
      <Text>No Travelers Yet</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={items}
        renderItem={({ item }) => <ItemCard item={item}></ItemCard>}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight
  }
});
