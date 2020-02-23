import React from "react";
import { View, Text, Image } from "react-native";

export default function TravelCard(props) {
  const { item } = props;
  // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const randomColor =
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")";

  return (
    <View>
      <Text style={{ color: randomColor }}>
        {item.userId.name} {randomColor}
      </Text>
      <Text>{JSON.stringify(Object.keys(item.userId))}</Text>
      <Text>{JSON.stringify(Object.keys(item))}</Text>
    </View>
  );
}
