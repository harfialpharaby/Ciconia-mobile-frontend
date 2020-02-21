import React from "react";
import {} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TravellerListScreen from "../screens/TravelerListScreen";
import ItemListScreen from "../screens/ItemListScreen";
import CartListScreen from "../screens/CartListScreen";

export default function PrivateNavigation(props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TravelerList"
        options={{ title: "Traveler" }}
        component={TravellerListScreen}
      />
      <Tab.Screen
        name="ItemList"
        options={{ title: "Item" }}
        component={ItemListScreen}
      />
      <Tab.Screen
        name="CartList"
        options={{ title: "Cart" }}
        component={CartListScreen}
      />
    </Tab.Navigator>
  );
}
