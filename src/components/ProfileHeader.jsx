import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
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

  const renderLocation = location => {
    const normalizedLocations = location.split(",");
    return (
      <View>
        {normalizedLocations.map((loc, index) => {
          return <Text key={`${loc}${index}`}>{loc.trim()}</Text>;
        })}
      </View>
    );
  };

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
        <Text style={styles.name}>{userId.name}</Text>
      </View>
      <View style={{ flex: 0.65, justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <FontAwesome
            name="plane"
            size={20}
            color="#f39c12"
            style={{ marginHorizontal: 5 }}
          ></FontAwesome>
          {renderLocation(locationFrom)}
          <Feather
            name="arrow-right"
            size={15}
            color="black"
            style={{ alignSelf: "center", marginHorizontal: 5 }}
          />
          {renderLocation(locationTo)}
        </View>

        <View style={{ flex: 0.5, flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="calendar" size={20} color="black" />
          <Text style={{ marginLeft: 5 }}>
            {Moment(departure).format("dddd, MMMM Do YYYY")}
          </Text>
        </View>
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
  aliasText: { fontSize: 70, color: "white" },
  name: {
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold"
  }
});
