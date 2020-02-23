import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CartModal(props) {
  const { showModal, setShowModal, item, setShowDetail, statuses } = props;

  const hideDetail = () => {
    setShowDetail(null);
    setShowModal(false);
  };

  const renderCurrentStatus = () => {
    let doneIndex = 0;
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i].name === item.status) {
        doneIndex = i;
        break;
      }
    }

    return statuses.map((status, index) => {
      return (
        <View style={{ width: 54, alignItems: "center" }} key={status.key}>
          {index <= doneIndex ? (
            <Feather name="check-circle" size={25} color="green"></Feather>
          ) : (
            <Feather name="circle" size={25} color="grey"></Feather>
          )}
          <Text style={{ textAlign: "center", fontSize: 11 }}>
            {status.name}
          </Text>
        </View>
      );
    });
  };

  return (
    <Modal animationType="none" transparent={true} visible={showModal}>
      <TouchableWithoutFeedback onPress={hideDetail}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flex: 0.7,
              width: "95%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 0.1,
                alignItems: "flex-end",
                flexDirection: "row",
                marginBottom: 5
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  textTransform: "capitalize"
                }}
              >
                {item.itemId.name}
              </Text>
              <Text> x{item.quantity}</Text>
            </View>
            <Image
              source={{ uri: item.itemId.image }}
              style={{ flex: 0.7, width: "100%" }}
              resizeMode="contain"
            ></Image>
            <View style={{ flex: 0.2, marginTop: 10, flexDirection: "row" }}>
              {renderCurrentStatus()}
            </View>
            {/* <Text>{JSON.stringify(item)}</Text> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
