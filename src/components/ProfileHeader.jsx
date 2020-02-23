import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Moment from "moment";

export default function ProfileHeader(props) {
  const {
    _id,
    itemList,
    userId,
    locationFrom,
    locationTo,
    departure
  } = props.item;
  const { randomColor } = props;
  const splitName = userId?.name.split(" ");
  const aliasName =
    splitName.length && splitName.length > 1
      ? `${splitName[0][0]}${splitName[1][0]}`
      : `${splitName[0][0]}`;

  return (
    <View style={{ flex: 0.3, flexDirection: "row" }}>
      <View
        style={{
          flex: 0.35,
          justifyContent: "space-evenly"
        }}
      >
        <View style={[styles.aliasBg, { backgroundColor: randomColor }]}>
          <Text style={styles.aliasText}>{aliasName.toUpperCase()}</Text>
        </View>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          {userId.name}
        </Text>
      </View>
      <View style={{ flex: 0.65, justifyContent: "center" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text style={{ letterSpacing: 1, fontSize: 20 }}>{locationFrom}</Text>
          <FontAwesome name="plane" size={20} color="black"></FontAwesome>
          <Text style={{ letterSpacing: 1, fontSize: 20 }}>{locationTo}</Text>
        </View>
        <Text style={{ letterSpacing: 1, fontSize: 15 }}>Depart at</Text>
        <Text style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 15 }}>
          {Moment(departure).format("dddd, MMMM Do YYYY")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aliasBg: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.2,
    marginRight: 10,
    width: 100,
    height: 100,
    borderRadius: 50
  },
  aliasText: { fontSize: 70, color: "white" }
});
