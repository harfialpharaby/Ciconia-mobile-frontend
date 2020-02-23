import React from "react";
import { View } from "react-native";
import Constants from "expo-constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import AddTripScreen from "../screens/AddTripScreen";
import AddRequestScreen from "../screens/AddRequestScreen";

export default function AddNavigation(props) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <Tab.Navigator tabBarOptions={{ pressColor: "#00adee" }}>
        <Tab.Screen name="Trip" component={AddTripScreen} />
        <Tab.Screen name="Request" component={AddRequestScreen} />
      </Tab.Navigator>
    </View>
  );
}
