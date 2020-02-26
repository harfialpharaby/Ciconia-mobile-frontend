import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ItemList from "../screens/ItemListScreen";
import ItemDetail from "../components/ItemDetail";

export default function ItemNavigation(props) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ItemList"
        options={{
          tabBarLabel: "Item",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          )
        }}
        component={ItemList}
      />
      <Stack.Screen
        name="ItemDetail"
        options={() => ({
          headerTransparent: true,
          headerTitleStyle: {
            display: "none"
          }
        })}
        component={ItemDetail}
      />
    </Stack.Navigator>
  );
}
