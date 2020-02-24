import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Animated
} from "react-native";
import { connect } from "react-redux";

import { addItem } from "../store/actions/items";
import InputItemForm from "../components/InputItemForm";

class AddRequestScreen extends Component {
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

  addNewItem = item => {
    this.props.dispatch(addItem(item, "watch"));
    this.props.navigation.navigate("ItemList");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={{ flex: 1, paddingBottom: this.keyboardHeight }}>
          <InputItemForm
            addItem={item => this.addNewItem(item)}
          ></InputItemForm>
        </Animated.View>
      </View>
    );
  }
}

export default connect()(AddRequestScreen);
