import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

import { fetchCartList } from "../store/actions/carts";
import SplashScreen from "./SplashScreen";
import CartList from "../components/CartList";
import CartModal from "../components/CartModal";

export default function CartListScreen(props) {
  const statuses = [
    { key: "all", name: "all" },
    { key: "open", name: "open", color: "#e74c3c" },
    { key: "offered", name: "offered", color: "#e67e22" },
    { key: "pendingPurchase", name: "pending purchase", color: "#f1c40f" },
    { key: "pendingDelivery", name: "pending delivery", color: "#8e44ad" },
    { key: "verification", name: "pending verification", color: "#2980b9" },
    { key: "completed", name: "completed", color: "#2ecc71" }
  ];
  const [refreshing, setRefreshing] = useState(false);
  const [statusShown, setStatusShown] = useState("");
  const { isLoading, carts, error } = useSelector(state => state.carts);
  const [showCarts, setShowCarts] = useState(carts);
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartList());
    setStatusShown("all");
    setShowModal(false);
  }, []);

  useEffect(() => {
    setShowCarts(carts);
  }, [isLoading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    dispatch(fetchCartList()).then(() => setRefreshing(false));
  }, [refreshing]);

  const filterStatus = status => {
    if (status.key === "all") {
      setShowCarts(carts);
    } else {
      setShowCarts(carts.filter(cart => cart.status === status.name));
    }
    setStatusShown(status.key);
  };

  const renderStatus = () => {
    return statuses.map(status => {
      return (
        <TouchableOpacity
          style={[
            styles.btnStatus,
            status.key === statusShown && {
              borderColor: status.color
            }
          ]}
          onPress={() => filterStatus(status)}
          key={status.key}
        >
          <Text
            style={[
              status.key === statusShown && {
                fontWeight: "bold",
                color: status.color
              },
              { textTransform: "capitalize" }
            ]}
          >
            {status.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return isLoading ? (
    <SplashScreen></SplashScreen>
  ) : (
    <View style={[styles.background, showModal && { opacity: 0.05 }]}>
      <View style={{ flex: 0.1, flexDirection: "row" }}>
        <Text style={{ marginHorizontal: 5, textAlignVertical: "center" }}>
          Filter
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {renderStatus()}
        </ScrollView>
      </View>
      <View style={{ flex: 0.9 }}>
        {!showCarts.length ? (
          <View style={styles.nullStatus}>
            <MaterialCommunityIcons
              name="weather-windy-variant"
              size={40}
              color="black"
            ></MaterialCommunityIcons>
            <Text style={{ textTransform: "capitalize", letterSpacing: 2 }}>
              no {statusShown} order
            </Text>
          </View>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            numColumns={2}
            key={2}
            data={showCarts}
            renderItem={({ item }) => (
              <CartList
                item={item}
                showModal={showModal}
                setShowModal={setShowModal}
                setShowDetail={setShowDetail}
              ></CartList>
            )}
            keyExtractor={item => item._id}
          />
        )}
      </View>
      {showModal && (
        <CartModal
          item={showDetail}
          setShowDetail={setShowDetail}
          showModal={showModal}
          setShowModal={setShowModal}
          statuses={statuses.slice(1)}
        ></CartModal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnStatus: {
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1
  },
  background: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  nullStatus: { flex: 1, justifyContent: "center", alignItems: "center" }
});
