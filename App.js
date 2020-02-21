import * as React from "react";
import { Provider } from "react-redux";
import store from "./src/store";

import RootNavigation from "./src/navigations/RootNavigation";

export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <RootNavigation></RootNavigation>
    </Provider>
  );
}
