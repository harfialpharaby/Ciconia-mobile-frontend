import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import { addCart } from "../store/actions/carts";
import ChangeNumberModal from "../components/ChangeNumberModal";

export default function ItemDetail(props) {
  const { item } = props.route.params;
  const { myProfile } = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  let status;
  if (item.status === "travel") {
    status = {
      color: "#0984e3",
      text: "Request",
      confirmText: "How many do you want?"
    };
  } else {
    status = {
      color: "#27ae60",
      text: "Offer Help",
      confirmText: "How much you offer?"
    };
  }

  const processTransaction = quantity => {
    setModalVisible(!modalVisible);
    if (item.status === "travel") {
      dispatch(
        addCart({
          travelId: item.ownerId._id,
          itemId: item._id,
          quantity: parseInt(quantity) || 1,
          status: "open",
          fixPrice: item.price
        })
      );
    } else {
    }
  };

  return (
    <View style={{ flex: 1, opacity: modalVisible ? 0.2 : 1 }}>
      <ImageBackground
        source={{ uri: item.image }}
        style={{ flex: 0.5, justifyContent: "flex-end" }}
      >
        <View
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#2f3640",
            alignItems: "flex-end"
          }}
        >
          {item.status === "travel" ? (
            <FontAwesome name="plane" size={20} color="white"></FontAwesome>
          ) : (
            <MaterialCommunityIcons
              name="shopping"
              size={20}
              color="white"
            ></MaterialCommunityIcons>
          )}
        </View>
      </ImageBackground>
      <View style={{ flex: 0.4 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.ItemDetail}>
          <Entypo name="shopping-bag" size={15} color="#00adee" />
          <Text style={{ marginLeft: 10 }}>
            Quantity <Text style={{ fontWeight: "bold" }}>{item.quantity}</Text>
          </Text>
        </View>
        <View style={styles.ItemDetail}>
          <Entypo name="globe" size={15} color="#00adee" />
          <Text style={{ marginLeft: 10 }}>
            Location <Text style={{ fontWeight: "bold" }}>{item.location}</Text>
          </Text>
        </View>
        <View style={styles.priceBg}>
          <Entypo name="price-tag" size={15} color="#00adee" />
          <Text style={{ marginLeft: 10 }}>
            Price per piece{" "}
            <Text style={{ fontWeight: "bold" }}>
              Rp{" "}
              {item.price?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Text>
          </Text>
        </View>
      </View>

      {item.ownerId._id !== myProfile.user._id && (
        <View style={{ flex: 0.1, flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.btnBg,
              {
                backgroundColor: status.color
              }
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.actionBtn}>{status.text}</Text>
          </TouchableOpacity>
        </View>
      )}

      <ChangeNumberModal
        confirmText={status.confirmText}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        processTransaction={processTransaction}
      ></ChangeNumberModal>
      {/* <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              flex: 0.3,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black"
            }}
          >
            <Text style={{ flex: 0.2, color: "white" }}>
              {status.confirmText}
            </Text>
            <TextInput
              value={quantity}
              onChangeText={text => setQuantity(text)}
              autoFocus={true}
              style={{
                textAlign: "center",
                flex: 0.3,
                borderBottomWidth: 1,
                borderBottomColor: "white",
                color: "white",
                width: 100
              }}
              keyboardType="phone-pad"
            ></TextInput>
            <View
              style={{
                flex: 0.3,
                alignItems: "flex-end",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.5
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#e74c3c"
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.5
                }}
                onPress={processTransaction}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#2ecc71"
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  itemName: {
    flex: 0.3,
    fontSize: 30,
    marginLeft: 15,
    textTransform: "capitalize",
    marginTop: 5
  },
  ItemDetail: { flex: 0.1, flexDirection: "row", marginLeft: 15 },
  priceBg: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    marginTop: 15,
    backgroundColor: "#ecffff"
  },
  btnBg: { flex: 1, justifyContent: "center", alignItems: "center" },
  actionBtn: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
    letterSpacing: 2
  }
});
