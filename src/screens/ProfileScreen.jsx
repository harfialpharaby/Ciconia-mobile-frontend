import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";

import ProfileHeader from "../components/ProfileHeader";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.route.params.item.itemList
    };
  }

  renderItems = () => {
    if (!this.state.items.length) {
      return (
        <View style={styles.noItem}>
          <FontAwesome
            name="paper-plane-o"
            size={32}
            color="black"
          ></FontAwesome>
          <Text
            style={{
              letterSpacing: 2,
              textTransform: "capitalize",
              marginTop: 10
            }}
          >
            No recommendation yet
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>I AM A TRAVELER</Text>
        </View>
      );
      return (
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ProfileHeader {...this.props.route.params}></ProfileHeader>
        {this.renderItems()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noItem: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.3,
    backgroundColor: "white"
  }
});
