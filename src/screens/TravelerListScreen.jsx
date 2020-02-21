import React, { createContext, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { SIGN_OUT } from "../store/actionTypes";
import { signOut } from "../store/actions/user";

export default function TravellerListScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>TRAVELLER LIST</Text>
      <Button title="Sign out" onPress={() => dispatch({ type: SIGN_OUT })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
