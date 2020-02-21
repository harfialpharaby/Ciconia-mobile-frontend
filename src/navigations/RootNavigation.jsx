import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { RESTORE_TOKEN } from "../store/actionTypes";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import PrivateNavigation from "./PrivateNavigation";
import TravelerListScreen from "../screens/TravelerListScreen";

const Stack = createStackNavigator();

export default function RootNavigation() {
  const dispatch = useDispatch();
  const { isLoading, isSignout, userToken } = useSelector(state => state.user);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: RESTORE_TOKEN, token: userToken });
    };

    bootstrapAsync();
  }, []);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Login",
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: isSignout ? "pop" : "push"
            }}
          />
        ) : (
          // User is signed in
          <Stack.Screen name="PrivateScreen" component={PrivateNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
