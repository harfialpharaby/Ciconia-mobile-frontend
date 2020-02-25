import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { RESTORE_TOKEN } from "../store/actionTypes";
import SplashScreen from "../screens/SplashScreen";
import PrivateNavigation from "./PrivateNavigation";
import AuthNavigation from "./AuthNavigation";

const Stack = createStackNavigator();

export default function RootNavigation() {
  const dispatch = useDispatch();
  const { isLoading, userToken, error } = useSelector(state => state.user);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: RESTORE_TOKEN, token: userToken });
    };

    bootstrapAsync();
  }, []);

  return isLoading ? (
    <SplashScreen text="Validating Account..." />
  ) : (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userToken ? (
          // No token found, user isn't signed in
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        ) : (
          // User is signed in
          <Stack.Screen name="PrivateScreen" component={PrivateNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
