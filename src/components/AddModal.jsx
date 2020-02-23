import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  ScrollView,
  Button,
  TextInput,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

export default function AddModal(props) {
  const { visible, setVisible, addItem } = props;
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

  const _openCamera = async () => {
    setImageModal(false);
    let image = await ImagePicker.launchCameraAsync({
      base64: true
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
      quality: 1
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
      // setNewItem({
      //   name: "",
      //   price: "",
      //   quantity: 1,
      //   image: null,
      //   city: "",
      //   country: ""
      // });
      setVisible(false);
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
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      presentationStyle="overFullScreen"
    >
      <View
        style={{
          flex: 1,
          marginTop: 30,
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
                placeholder="Tell us what item you can buy?"
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
                      <MaterialIcons
                        name="add-a-photo"
                        size={32}
                        color="black"
                      />
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
                    onLongPress={() =>
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
                placeholder="What country you gonna buy that item?"
                onChangeText={country => setNewItem({ ...newItem, country })}
                value={newItem.country}
              ></TextInput>

              <Text>City Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Specify the city you buy the item"
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
                placeholder="What price you offer to others?"
                onChangeText={price => setNewItem({ ...newItem, price })}
                value={newItem.price}
              ></TextInput>
            </View>
          </View>
        </ScrollView>
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
        {renderAddImageModal()}
      </View>
    </Modal>
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
    backgroundColor: "#ecf0f1"
  },
  footer: {
    flex: 0.2,
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
