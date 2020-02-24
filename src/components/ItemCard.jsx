import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ItemCard(props) {
  const { item } = props;
  const { width } = Dimensions.get("window");

  return (
    <View>
      <TouchableOpacity>
        <ImageBackground
          source={{
            uri: item.image
          }}
          style={{ width: width / 3.1, height: width / 3.1, margin: 2 }}
        >
          <View style={styles.itemStatusBg}>
            {item.status === "travel" ? (
              <FontAwesome name="plane" size={15} color="white"></FontAwesome>
            ) : (
              <MaterialCommunityIcons
                name="shopping"
                size={15}
                color="white"
              ></MaterialCommunityIcons>
            )}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemStatusBg: {
    position: "absolute",
    right: 2,
    top: 2,
    padding: 2,
    borderRadius: 5,
    backgroundColor: "#2f3640"
  }
});
