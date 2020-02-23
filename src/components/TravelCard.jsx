import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Moment from "moment";
import { useNavigation } from "@react-navigation/native";

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
  const { width } = Dimensions.get("window");
  const splitName = item?.userId?.name.split(" ");
  const aliasName =
    splitName.length && splitName.length > 1
      ? `${splitName[0][0]}${splitName[1][0]}`
      : `${splitName[0][0]}`;

  return (
    <View
      style={{
        flex: 1,
        width,
        height: 100,
        flexDirection: "row",
        marginBottom: 15
      }}
    >
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
      <View style={[styles.triangleCorner]} />
      <TouchableOpacity
        style={styles.content}
        onPress={() =>
          navigation.navigate("TravelerScreen", { item, randomColor })
        }
      >
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            <Text style={{ fontWeight: "normal" }}>Hi, I am </Text>
            {item.userId.name.charAt(0).toUpperCase() +
              item.userId.name.slice(1)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <Text style={{ letterSpacing: 1 }}>{item.locationFrom}</Text>
            <FontAwesome name="plane" size={20} color="black" />
            <Text style={{ letterSpacing: 1 }}>{item.locationTo}</Text>
          </View>
          <Text style={{ letterSpacing: 1 }}>
            See my shopping list in{" "}
            <Text style={{ fontWeight: "bold" }}>{item.locationFrom}</Text>
          </Text>
          <Text style={{ letterSpacing: 1 }}>
            before{" "}
            <Text style={{ fontWeight: "bold" }}>
              {Moment(item.departure).format("dddd, MMMM Do YYYY")}
            </Text>
          </Text>
          {/* <Text>{JSON.stringify(Object.keys(item))}</Text> */}
        </View>
      </TouchableOpacity>
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
