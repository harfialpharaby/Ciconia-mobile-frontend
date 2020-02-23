import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

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
        <View style={{ width: 55, alignItems: "center" }} key={status.key}>
          {index < doneIndex ? (
            <Feather name="check-circle" size={25} color="#2ecc71"></Feather>
          ) : index === doneIndex && index < statuses.length ? (
            <TouchableOpacity>
              <FontAwesome
                name="circle"
                size={25}
                color="#f1c40f"
              ></FontAwesome>
            </TouchableOpacity>
          ) : (
            <Feather name="circle" size={25} color="#7f8c8d"></Feather>
          )}
          <Text style={styles.statusName}>{status.name}</Text>
        </View>
      );
    });
  };

  const renderHeader = () => {
    return (
      <View style={{ flex: 0.13, paddingTop: 20, width: "100%" }}>
        <View style={styles.headerTitleBg}>
          <Text style={styles.headerTitle}>{item.itemId.name}</Text>
          <Text style={{ color: "white" }}> x{item.quantity}</Text>
        </View>
        <View style={styles.headerSubBackground}>
          <Text style={styles.headerSubForeground}>
            {item.travelId.userId.name + " "}
            <Text style={{ fontWeight: "normal", textTransform: "none" }}>
              will buy this item for you from
            </Text>
            {" " + item.itemId.location}
          </Text>
        </View>
        <View style={styles.itemStatusBg}>
          {item.itemId.status === "travel" ? (
            <FontAwesome name="send" size={25} color="white"></FontAwesome>
          ) : (
            <MaterialCommunityIcons
              name="shopping"
              size={25}
              color="white"
            ></MaterialCommunityIcons>
          )}
        </View>
      </View>
    );
  };

  return (
    <Modal animationType="none" transparent={true} visible={showModal}>
      <TouchableWithoutFeedback onPress={hideDetail}>
        <View style={styles.background}>
          <View style={styles.foreground}>
            {renderHeader()}
            <ImageBackground
              source={{ uri: item.itemId.image }}
              style={{ flex: 0.87, width: "100%" }}
              resizeMode="contain"
            ></ImageBackground>
            <View style={{ flex: 0.1, marginBottom: 10, flexDirection: "row" }}>
              {renderCurrentStatus()}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, alignItems: "center", justifyContent: "center" },
  foreground: {
    flex: 0.8,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#2f3640",
    paddingBottom: 10
  },
  statusName: {
    textAlign: "center",
    fontSize: 11,
    color: "white",
    textTransform: "capitalize"
  },
  headerTitleBg: {
    flex: 0.5,
    alignItems: "baseline",
    flexDirection: "row"
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "capitalize",
    color: "white",
    marginLeft: 10,
    letterSpacing: 1
  },
  headerSubBackground: {
    flex: 0.5,
    width: "100%",
    alignSelf: "flex-start"
  },
  headerSubForeground: {
    fontWeight: "bold",
    letterSpacing: 0.5,
    textTransform: "capitalize",
    color: "white",
    marginLeft: 10
  },
  itemStatusBg: {
    position: "absolute",
    right: 10,
    top: 10
  }
});
