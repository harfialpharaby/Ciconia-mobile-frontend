import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Alert,
  Linking,
  ToastAndroid,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import { BASE_URL } from "../url";
import ChangeNumberModal from "../components/ChangeNumberModal";

export default function CartModal(props) {
  const {
    showModal,
    setShowModal,
    item,
    setShowDetail,
    statuses,
    isWatcher
  } = props;
  const [doneIndex, setDoneIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const hideDetail = () => {
    setShowDetail(null);
    setShowModal(false);
  };

  useEffect(() => {
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i].name === item.status) {
        setDoneIndex(i);
        break;
      }
    }

    return () => setDoneIndex(0);
  }, []);

  const renderCurrentStatus = () => {
    return statuses.map((status, index) => {
      return (
        <View style={{ flex: 1, alignItems: "center" }} key={status.key}>
          {index < doneIndex || index === statuses.length ? (
            <Feather name="check-circle" size={20} color="#2ecc71"></Feather>
          ) : index === doneIndex && index < statuses.length ? (
            <TouchableOpacity>
              <FontAwesome
                name="circle"
                size={20}
                color="#f1c40f"
              ></FontAwesome>
            </TouchableOpacity>
          ) : (
            <Feather name="circle" size={20} color="#7f8c8d"></Feather>
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
          {item.itemId?.ownerId?.name && isWatcher ? (
            <Text style={styles.headerSubForeground}>
              {item.itemId?.ownerId?.name + " "}
              <Text style={{ fontWeight: "normal", textTransform: "none" }}>
                will buy this item for you from
              </Text>
              {" " + item.itemId.location}
            </Text>
          ) : (
            <Text
              style={[
                styles.headerSubForeground,
                { fontWeight: "normal", textTransform: "none" }
              ]}
            >
              You need to verify this request from
              <Text style={{ fontWeight: "bold" }}>
                {" " + item.itemId.location}
              </Text>
            </Text>
          )}
        </View>
        <View style={styles.itemStatusBg}>
          {item.itemId.status === "travel" ? (
            <FontAwesome name="plane" size={25} color="white"></FontAwesome>
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

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    let reverseGeolocation = await Location.reverseGeocodeAsync(
      currentLocation.coords
    );
    return reverseGeolocation;
  };

  const verifyWithCamera = async status => {
    let image = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true
    });
    if (!image.cancelled) {
      const arrLocation = item.itemId.location.split(",");
      let photoLocation;
      if (image.exif.GPSLatitude && image.exif.GPSLongitude) {
        photoLocation = await Location.reverseGeocodeAsync({
          latitude: image.exif.GPSLatitude,
          longitude: image.exif.GPSLongitude
        });
      } else {
        photoLocation = _getLocationAsync();
      }

      if (
        arrLocation[arrLocation.length - 1].trim().toLowerCase() ==
        photoLocation[0].country.trim().toLowerCase()
      ) {
        changeStatusTo(status);
      }
    }
    ToastAndroid.show(
      "Confirmation rejected by system due to lack of data you provide",
      ToastAndroid.LONG
    );
  };

  const verifyWithInvoice = async status => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/payment/${item.invoiceId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token
        }
      });
      if (response.ok) {
        const { invoice_url, status } = await response.json();
        if (status === "SETTLED") {
          changeStatusTo("pending delivery");
          ToastAndroid.show("Your payment is confirmed", ToastAndroid.LONG);
        } else {
          Alert.alert(
            "ALERT!",
            `Your payment is ${status}, do you want to open your payment gateway link?`,
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => Linking.openURL(invoice_url) }
            ]
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatusTo = async status => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/carts/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        const changed = await response.json();
      }
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };

  const processTransaction = quantity => {
    setModalVisible(false);
    withPayment("pending purchase", quantity);
  };

  const withPayment = async (status, quantity) => {
    try {
      let amount;
      if (quantity) {
        amount = item.fixPrice * quantity;
      } else {
        amount = item.fixPrice * item.quantity;
      }

      const token = await AsyncStorage.getItem("userToken");
      const resInvoice = await fetch(`${BASE_URL}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify({
          amount: amount >= 10000 ? amount : 10000,
          description: item.itemId.name
        })
      });
      if (resInvoice.ok) {
        const { id, invoice_url } = await resInvoice.json();
        Linking.openURL(invoice_url);

        const resCart = await fetch(`${BASE_URL}/carts/${item._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token
          },
          body: JSON.stringify({ invoiceId: id })
        });
        if (resCart.ok) {
          changeStatusTo(status);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actions = () => {
    switch (item.status) {
      case "open":
        withPayment("pending purchase");
        break;
      case "offered":
        setModalVisible(true);
        break;
      case "pending purchase":
        verifyWithInvoice("pending verification");
        break;
      case "pending verification":
        verifyWithCamera("pending delivery");
        break;
      case "pending delivery":
        changeStatusTo("completed");
        break;
      default:
        changeStatusTo("completed");
        break;
    }
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
          {statuses[doneIndex]?.authorized && (
            <View style={styles.footerBackground}>
              {statuses[doneIndex].authorized === "buyer" || !isWatcher ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.confirmBg, { backgroundColor: "#00adee" }]}
                  onPress={actions}
                >
                  <Text style={styles.confirmText}>
                    confirm {statuses[doneIndex].name}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.confirmBg}>
                  <Text style={styles.confirmText}>
                    waiting response from traveler
                  </Text>
                </View>
              )}
            </View>
          )}
          <ChangeNumberModal
            confirmText={
              item.status === "travel"
                ? "How many do you want?"
                : "How much you offer?"
            }
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            processTransaction={processTransaction}
          ></ChangeNumberModal>
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
    fontSize: 10,
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
    marginLeft: 10
  },
  headerSubBackground: {
    flex: 0.5,
    width: "100%",
    alignSelf: "flex-start"
  },
  headerSubForeground: {
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "white",
    marginHorizontal: 10
  },
  itemStatusBg: {
    position: "absolute",
    right: 10,
    top: 10
  },
  footerBackground: {
    flex: 0.2,
    width: "100%",
    justifyContent: "flex-end"
  },
  confirmBg: {
    flex: 0.5,
    justifyContent: "center",
    backgroundColor: "#2f3640"
  },
  confirmText: {
    textTransform: "capitalize",
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});
