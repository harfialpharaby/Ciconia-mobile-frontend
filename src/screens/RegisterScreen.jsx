import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import { userRegister } from "../store/actions/user";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const selector = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validateInput = () => {
    if (!confirm.length || !password.length || !name.length || !email.length) {
      Alert.alert("ALERT !", "Fill all inputs to continue register !");
    } else if (confirm !== password) {
      Alert.alert("ALERT !", "Password must be the same !");
    } else {
      dispatch(userRegister({ email, name, password }));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View
          style={{
            flex: 0.95,
            width: "100%",
            paddingBottom: 100,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View>
            <Image
              source={require("../../assets/transparent.png")}
              style={{ width: 150, height: 150 }}
            ></Image>
          </View>
          <View style={styles.inputText}>
            <Feather name="user" size={20} color="black"></Feather>
            <TextInput
              style={{ marginLeft: 5, width: "90%" }}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputText}>
            <MaterialCommunityIcons
              name="email-outline"
              size={20}
              color="black"
            />
            <TextInput
              style={{ marginLeft: 5, width: "90%" }}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputText}>
            <AntDesign name="lock" size={20} color="black" />
            <TextInput
              style={{ marginLeft: 5, width: "90%" }}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.inputText}>
            <AntDesign name="lock" size={20} color="black" />
            <TextInput
              style={{ marginLeft: 5, width: "90%" }}
              placeholder="Repeat Password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.signinBtn} onPress={validateInput}>
            <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.05, flexDirection: "row" }}>
          <Text>Already have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontWeight: "bold" }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25
  },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  signinBtn: {
    backgroundColor: "#00adee",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    padding: 10,
    marginTop: 5,
    borderRadius: 50,
    height: 40
  }
});
