import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { FontAwesome, AntDesign, Feather } from "@expo/vector-icons";
import Moment from "moment";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function TravelCard(props) {
  const randomColor =
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")";
  const { item } = props;
  const navigation = useNavigation();
  const splitName = item?.userId?.name.split(" ");
  const aliasName =
    splitName.length && splitName.length > 1
      ? `${splitName[0][0]}${splitName[1][0]}`
      : `${splitName[0][0]}`;

  return (
    <View style={styles.background}>
      <TouchableOpacity
        style={{ flex: 0.2, justifyContent: "center" }}
        onPress={() =>
          navigation.navigate("TravelerScreen", { item, randomColor })
        }
      >
        <View style={[styles.aliasBg, { backgroundColor: randomColor }]}>
          <Text style={styles.aliasText}>{aliasName.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.triangleCorner} />
      <TouchableOpacity
        style={styles.content}
        onPress={() =>
          navigation.navigate("TravelerScreen", { item, randomColor })
        }
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ textTransform: "capitalize", fontWeight: "bold" }}>
              {item.userId.name}
            </Text>
          </View>
          <View style={styles.location}>
            <FontAwesome name="plane" size={20} color="#f39c12" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>
              {item.locationFrom.split(",").length > 1
                ? item.locationFrom.split(",")[1]
                : item.locationFrom}
            </Text>
            <Feather
              name="arrow-right"
              size={12}
              color="black"
              style={{ alignSelf: "center", marginHorizontal: 5 }}
            />
            <Text style={{ fontSize: 15 }}>
              {item.locationTo.split(",").length > 1
                ? item.locationTo.split(",")[1]
                : item.locationTo}
            </Text>
          </View>
          <View style={{ flex: 0.3, flexDirection: "row" }}>
            <AntDesign name="calendar" size={20} color="black" />
            <Text style={{ textAlignVertical: "center", marginLeft: 3 }}>
              {Moment(item.departure).format("dddd, MMMM Do YYYY")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height: 100,
    flexDirection: "row",
    marginBottom: 5
  },
  location: {
    flex: 0.3,
    flexDirection: "row",
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 5
  },
  aliasBg: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.2,
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 50
  },
  aliasText: { fontSize: 25, color: "white" },
  content: {
    flex: 0.8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    padding: 7,
    paddingLeft: 20
  },
  triangleCorner: {
    alignSelf: "center",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: "transparent",
    borderTopColor: "white",
    transform: [{ rotate: "180deg" }]
  }
});
