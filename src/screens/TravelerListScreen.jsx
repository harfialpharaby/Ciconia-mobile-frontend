import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";

import { fetchTravelList } from "../store/actions/travels";
import TravelCard from "../components/TravelCard";

export default function TravellerListScreen(props) {
  const navigation = useNavigation();
  const { isLoading, travels, error } = useSelector(state => state.travels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTravelList());
  }, []);

  return isLoading ? (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  ) : !travels.length ? (
    <View style={styles.container}>
      <Text>No Travelers Yet</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={travels}
        renderItem={({ item }) => <TravelCard item={item}></TravelCard>}
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
