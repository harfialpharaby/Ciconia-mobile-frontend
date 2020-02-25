import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo
} from "@expo/vector-icons";

export default function ItemCard(props) {
  const { item } = props;
  const { width } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{ flex: 1 }}>
          <Image source={{ uri: item.image }} style={{ flex: 0.5 }}></Image>
          <View style={{ flex: 0.4, marginLeft: 15 }}>
            <Text
              style={{
                flex: 0.3,
                fontSize: 30,
                textTransform: "capitalize",
                marginTop: 5
              }}
            >
              {item.name}
            </Text>
            <View style={{ flex: 0.1, flexDirection: "row" }}>
              <Entypo name="email" size={15} color="#00adee" />
              <Text style={{ marginLeft: 10 }}>Buyer {item.ownerId.email}</Text>
            </View>
            <View style={{ flex: 0.1, flexDirection: "row" }}>
              <Entypo name="shopping-bag" size={15} color="#00adee" />
              <Text style={{ marginLeft: 10 }}>Quantity {item.quantity}</Text>
            </View>
            <View style={{ flex: 0.1, flexDirection: "row" }}>
              <Entypo name="globe" size={15} color="#00adee" />
              <Text style={{ marginLeft: 10 }}>Buy at {item.location}</Text>
            </View>
            <View style={{ flex: 0.1, flexDirection: "row" }}>
              <Entypo name="price-tag" size={15} color="#00adee" />
              <Text style={{ marginLeft: 10 }}>
                Price per piece {item.price}
              </Text>
            </View>
            {/* <Text>{JSON.stringify(item)}</Text> */}
          </View>

          <View style={{ flex: 0.1, backgroundColor: "lightblue" }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
