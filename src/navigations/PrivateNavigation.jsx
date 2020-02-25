import React, { useEffect } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyProfile } from "../store/actions/user";
import SplashScreen from "../screens/SplashScreen";
import ItemList from "../screens/ItemListScreen";
import CartListScreen from "../screens/CartListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddNavigation from "./AddNavigation";
import TravelNavigation from "./TravelNavigation";

export default function PrivateNavigation(props) {
  const Tab = createBottomTabNavigator();
  const { loadingProfile } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, []);

  return loadingProfile ? (
    <SplashScreen text="Fetching Profile..." />
  ) : (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
        activeTintColor: "#00adee"
      }}
    >
      <Tab.Screen
        name="TravelNavigation"
        options={{
          tabBarLabel: "Traveler",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          )
        }}
        component={TravelNavigation}
      />
      <Tab.Screen
        name="ItemList"
        options={{
          tabBarLabel: "Item",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          )
        }}
        component={ItemList}
      />
      <Tab.Screen
        name="Add"
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#00adee"
              }}
            >
              <AntDesign
                name={focused ? "closecircleo" : "pluscircleo"}
                color="white"
                size={30}
              />
            </View>
          )
        }}
        component={AddNavigation}
      />
      <Tab.Screen
        name="CartList"
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" color={color} size={size} />
          )
        }}
        component={CartListScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          )
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
