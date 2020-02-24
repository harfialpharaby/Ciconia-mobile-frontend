import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const statusColor = {
  open: "#e74c3c",
  offered: "#e67e22",
  "pending purchase": "#f1c40f",
  "pending delivery": "#8e44ad",
  verification: "#2980b9",
  completed: "#2ecc71"
};

export default function CartList(props) {
  const { item, showModal, setShowModal, setShowDetail } = props;

  const showDetail = () => {
    setShowDetail(item);
    setShowModal(true);
  };

  return (
    <TouchableOpacity style={styles.background} onPress={showDetail}>
      <View style={{ width: "100%" }}>
        <ImageBackground
          source={{ uri: item.itemId.image }}
          style={styles.image}
        >
          <View style={styles.itemStatusBg}>
            {item.itemId.status === "travel" ? (
              <FontAwesome name="plane" size={15} color="white"></FontAwesome>
            ) : (
              <MaterialCommunityIcons
                name="shopping"
                size={15}
                color="white"
              ></MaterialCommunityIcons>
            )}
          </View>
          <View
            style={[
              styles.statusBg,
              { backgroundColor: statusColor[item.status] }
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 2,
    width: width / 2,
    height: width / 2
  },
  image: {
    width: "98%",
    height: "98%",
    justifyContent: "flex-end"
  },
  statusBg: {
    flex: 0.2,
    width: "98%",
    justifyContent: "center"
  },
  statusText: {
    textTransform: "capitalize",
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  itemStatusBg: {
    position: "absolute",
    right: 5,
    top: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#2f3640"
  }
});
