import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";

import { SIGN_OUT } from "../store/actionTypes";
import ProfileHeader from "../components/ProfileHeader";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props?.route?.params?.item?.itemList || null
    };
  }

  renderItems = () => {
    if (!this.state?.items?.length) {
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
    return !this.state.items ? (
      <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        <View
          style={{
            flex: 0.07,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            width: "95%"
          }}
        >
          <Text>PROFILE NAME</Text>
          <TouchableOpacity
            onPress={() => this.props.dispatch({ type: SIGN_OUT })}
          >
            <Text style={{ fontWeight: "bold", color: "grey" }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.93, width: "100%", backgroundColor: "blue" }}>
          <Text>MY PROFILE</Text>
        </View>
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <ProfileHeader {...this.props.route.params}></ProfileHeader>
        {this.renderItems()}
      </View>
    );
  }
}

export default connect()(ProfileScreen);

const styles = StyleSheet.create({
  noItem: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.3,
    backgroundColor: "white"
  }
});
