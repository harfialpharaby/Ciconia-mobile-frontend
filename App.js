import * as React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store";

import RootNavigation from "./src/navigations/RootNavigation";

export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <RootNavigation></RootNavigation>
    </Provider>
  );
}
