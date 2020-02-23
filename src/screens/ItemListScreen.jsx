import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";

import { fetchItemList } from "../store/actions/items";
import ItemCard from "../components/ItemCard";

export default function CartListScreen(props) {
  const navigation = useNavigation();
  const { isLoading, items, error } = useSelector(state => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItemList());
  }, []);

  return isLoading ? (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  ) : !items.length ? (
    <View style={styles.container}>
      <Text>No Travelers Yet</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
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
