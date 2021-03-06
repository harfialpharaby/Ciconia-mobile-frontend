import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TravelerList from "../screens/TravelerListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";

export default function PrivateNavigation(props) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TravelerList"
        options={{ headerShown: false }}
        component={TravelerList}
      />
      <Stack.Screen
        name="TravelerScreen"
        options={({ route }) => ({
          title: route.params.item.userId.name
        })}
        component={ProfileScreen}
      />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
