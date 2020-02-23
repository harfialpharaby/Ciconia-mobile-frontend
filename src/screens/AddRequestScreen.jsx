import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Animated
} from "react-native";

import AddModal from "../components/AddModal";

export default class AddRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  keyboardDidShow = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      })
    ]).start();
  };

  keyboardDidHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0
      })
    ]).start();
  };

  validateInput = item => {
    console.log(item);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{ flex: 0.9, paddingBottom: this.keyboardHeight }}
        >
          <AddModal addItem={item => this.validateInput(item)}></AddModal>
        </Animated.View>
        <TouchableOpacity
          style={{
            flex: 0.1,
            flexDirection: "row",
            width: Dimensions.get("window").width,
            marginLeft: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00adee"
          }}
        >
          <Text
            style={{
              fontSize: 20,
              letterSpacing: 5
            }}
          >
            POST REQUEST
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
