import React, { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Image
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";

import { fetchTravelList } from "../store/actions/travels";
import TravelCard from "../components/TravelCard";
import SplashScreen from "./SplashScreen";

export default function TravellerListScreen(props) {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, travels, error } = useSelector(state => state.travels);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    dispatch(fetchTravelList()).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    dispatch(fetchTravelList());
  }, []);

  return isLoading ? (
    <SplashScreen text="Fetching Travelers..."></SplashScreen>
  ) : !travels.length ? (
    <View style={styles.container}>
      <Text>No Travelers Yet</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          paddingTop: Constants.statusBarHeight,
          borderBottomWidth: 0.3
        }}
      >
        <Image
          source={require("../../assets/transparent.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
        ></Image>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ marginTop: 5 }}
        style={{ flex: 0.9 }}
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
    backgroundColor: "#74b9ff",
    alignItems: "center",
    justifyContent: "center"
  }
});
