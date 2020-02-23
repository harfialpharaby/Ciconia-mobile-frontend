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
        <Tab.Screen
          name="Trip"
          component={AddTripScreen}
          options={{
            tabBarLabel: "Trip",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="plane" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Request"
          component={AddRequestScreen}
          options={{
            tabBarLabel: "Request",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="suitcase" color={color} size={size} />
            )
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
