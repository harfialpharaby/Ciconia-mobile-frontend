import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

export default function ItemCard(props) {
  const { item } = props;
  const { width } = Dimensions.get("window");

  return (
    <View>
      <TouchableOpacity>
        <Image
          source={{
            uri: item.image
          }}
          style={{ width: width / 3.1, height: width / 3.1, margin: 2 }}
        />
      </TouchableOpacity>
    </View>
  );
}
