import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  ScrollView,
  TextInput,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Dimensions
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

export default function AddModal(props) {
  const { setVisible, addItem } = props;
  const [imageModal, setImageModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    quantity: 1,
    image: null,
    city: "",
    country: ""
  });

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted" || cameraPermission.status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
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
    // setCurrentLocation(reverseGeolocation);
    // console.log(reverseGeolocation);
  };

  const _openCamera = async () => {
    setImageModal(false);
    let image = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true
    });
    if (!image.cancelled) {
      setNewItem({ ...newItem, image });
    }
  };

  const _pickImage = async () => {
    setImageModal(false);
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
      exif: true
    });

    if (!image.cancelled) {
      setNewItem({ ...newItem, image });
    }
  };

  const inputValidation = () => {
    const { name, price, image, country, city } = newItem;
    if (
      !name.length ||
      !price.length ||
      !image ||
      !country.length ||
      !city.length
    ) {
      Alert.alert("ALERT!", "Please fill all data in order to save!");
    } else {
      setNewItem({
        name: "",
        price: "",
        quantity: 1,
        image: null,
        city: "",
        country: ""
      });
      setVisible && setVisible(false);
      addItem(newItem);
    }
  };

  const renderAddImageModal = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={imageModal}>
        <TouchableWithoutFeedback onPress={() => setImageModal(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flex: 0.1,
                width: "70%",
                alignSelf: "center",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderColor: "#00adee"
                }}
                onPress={_openCamera}
              >
                <MaterialIcons name="photo-camera" size={32} color="black" />
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  CAMERA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderLeftWidth: 1,
                  borderColor: "#00adee"
                }}
                onPress={_pickImage}
              >
                <MaterialIcons name="photo" size={32} color="black" />
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  UPLOAD
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                fontStyle: "italic",
                opacity: 0.4
              }}
            >
              Tap anywhere to dismiss
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  useEffect(() => {
    getPermissionAsync();
    if (Platform.OS === "android" && !Constants.isDevice) {
      Alert.alert(
        "ALERT!",
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      _getLocationAsync();
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 30,
        marginBottom: setVisible ? 5 : 0,
        opacity: imageModal ? 0.1 : 1
      }}
    >
      <ScrollView style={{ flex: 0.8 }}>
        <View style={styles.inputBody}>
          <View style={{ flex: 0.2 }}>
            <View style={styles.stepInfo}>
              <Text style={styles.stepText}>1</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.title}>Description</Text>
            <Text>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Item Name"
              onChangeText={name => setNewItem({ ...newItem, name })}
              value={newItem.name}
            ></TextInput>
            <View style={[styles.textInput, { borderBottomWidth: 0 }]}>
              <Text>Image</Text>
              <TouchableWithoutFeedback onPress={() => setImageModal(true)}>
                {newItem.image ? (
                  <Image
                    source={{ uri: newItem.image.uri }}
                    style={{ width: 200, height: 200 }}
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <MaterialIcons name="add-a-photo" size={32} color="white" />
                  </View>
                )}
              </TouchableWithoutFeedback>
            </View>
            <View
              style={[
                styles.textInput,
                {
                  flexDirection: "row",
                  borderBottomWidth: 0
                }
              ]}
            >
              <Text style={{ flex: 0.3, textAlignVertical: "center" }}>
                Quantity
              </Text>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row"
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setNewItem({
                      ...newItem,
                      quantity:
                        newItem.quantity > 1
                          ? newItem.quantity - 1
                          : newItem.quantity
                    })
                  }
                >
                  <AntDesign name="minuscircleo" size={25} color="red" />
                </TouchableOpacity>
                <TextInput
                  style={{
                    textAlign: "center",
                    width: 100,
                    borderBottomWidth: 1
                  }}
                  keyboardType="phone-pad"
                  onChangeText={text => {
                    if (text !== "") {
                      setNewItem({ ...newItem, quantity: parseInt(text) });
                    } else {
                      setNewItem({ ...newItem, quantity: 1 });
                    }
                  }}
                  value={JSON.stringify(newItem?.quantity)}
                ></TextInput>
                <TouchableOpacity
                  onPress={() =>
                    setNewItem({ ...newItem, quantity: newItem.quantity + 1 })
                  }
                >
                  <AntDesign name="pluscircleo" size={25} color="green" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.inputBody}>
          <View style={{ flex: 0.2 }}>
            <View style={styles.stepInfo}>
              <Text style={styles.stepText}>2</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.title}>Country</Text>
            <Text>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Country Name"
              onChangeText={country => setNewItem({ ...newItem, country })}
              value={newItem.country}
            ></TextInput>

            <Text>City Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="City Name"
              onChangeText={city => setNewItem({ ...newItem, city })}
              value={newItem.city}
            ></TextInput>
          </View>
        </View>

        <View style={styles.inputBody}>
          <View style={{ flex: 0.2 }}>
            <View style={styles.stepInfo}>
              <Text style={styles.stepText}>3</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.title}>Price Per Piece</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="phone-pad"
              placeholder="Offered Price"
              onChangeText={price => setNewItem({ ...newItem, price })}
              value={newItem.price}
            ></TextInput>
          </View>
        </View>
      </ScrollView>
      {setVisible ? (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnHide}
            onPress={() => {
              setVisible(false);
            }}
          >
            <AntDesign name="down" size={32} color="white"></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSave} onPress={inputValidation}>
            <Feather name="save" size={28} color="white"></Feather>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={{
            flex: 0.11,
            flexDirection: "row",
            width: Dimensions.get("window").width,
            marginLeft: 0,
            justifyContent: "center",
            alignItems: "center",
            margintop: 10,
            backgroundColor: "#00adee"
          }}
          onPress={inputValidation}
        >
          <Text
            style={{
              fontSize: 20,
              letterSpacing: 5
            }}
          >
            POST REQUEST
          </Text>
        </TouchableOpacity>
      )}
      {renderAddImageModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  stepInfo: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    width: 30,
    height: 30,
    backgroundColor: "#f39c12",
    borderRadius: 50
  },
  stepText: { fontSize: 15 },
  inputBody: { flex: 1, flexDirection: "row" },
  textInput: {
    width: "95%",
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1
  },
  title: { fontWeight: "bold", fontSize: 20 },
  detail: { flex: 0.8 },
  btnHide: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 50,
    marginLeft: 20
  },
  btnSave: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#00adee",
    borderRadius: 50,
    marginLeft: 20
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#34495e"
  },
  footer: {
    flex: 0.2,
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
