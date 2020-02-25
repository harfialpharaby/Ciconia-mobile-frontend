import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function RecommendationList(props) {
  const { item, index, remove } = props;

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1]
    });

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingRight: 100,
          paddingLeft: 10,
          backgroundColor: "red"
        }}
        onPress={() => remove(index)}
      >
        <Feather name="trash-2" size={30} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            borderRadius: 10,
            borderBottomWidth: 0.3,
            paddingVertical: 15
          }}
        >
          <View
            style={{
              flex: 0.3,
              alignItems: "center",
              padding: 5
            }}
          >
            <Image
              source={{ uri: item?.image?.uri }}
              style={{ width: 70, height: 70, borderRadius: 5 }}
            />
          </View>
          <View style={{ flex: 0.7, marginRight: 10 }}>
            <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {item.name} (x{item.quantity})
            </Text>
            <Text>{item.price} / pcs</Text>
            <Text>
              {item.city}, {item.country}
            </Text>
            <Text
              style={{
                opacity: 0.3,
                fontStyle: "italic",
                textAlign: "right",
                marginTop: 10
              }}
            >
              >> Swipe to delete
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}
