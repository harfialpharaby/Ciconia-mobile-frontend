import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";

import { SIGN_OUT } from "../store/actionTypes";
import { fetchMyProfile } from "../store/actions/user";
import ProfileHeader from "../components/ProfileHeader";
import ItemCard from "../components/ItemCard";
import SplashScreen from "./SplashScreen";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props?.route?.params?.item?.itemList || null,
      refreshing: false
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props
      .dispatch(fetchMyProfile())
      .then(() => this.setState({ refreshing: false }));
  };

  renderItems = () => {
    if (this.props.user.loadingProfile) {
      return <SplashScreen text="Updating Profile Data..."></SplashScreen>;
    } else if (
      (this.props.route.name === "TravelerScreen" &&
        !this.state.items?.length) ||
      (this.props.route.name === "Profile" &&
        !this.props.user.myProfile?.items.length)
    ) {
      return (
        <View style={styles.item}>
          <FontAwesome
            name="paper-plane-o"
            size={32}
            color="black"
          ></FontAwesome>
          <Text style={{ marginTop: 5, letterSpacing: 1 }}>
            No Recommendation Yet
          </Text>
        </View>
      );
    } else if (this.props.user.myProfile?.items || this.state.items?.length) {
      return (
        <View style={styles.item}>
          <FlatList
            refreshControl={
              !this.state.items && (
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              )
            }
            showsVerticalScrollIndicator={false}
            numColumns={3}
            key={3}
            data={
              this.state.items
                ? this.state.items.reverse()
                : this.props.user.myProfile.items.reverse()
            }
            renderItem={({ item }) => <ItemCard item={item}></ItemCard>}
            keyExtractor={item => item._id}
          />
        </View>
      );
    }
  };

  render() {
    const { myProfile } = this.props.user;

    return (
      <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        {!this.props.route?.params?.item && (
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
            <Text>{myProfile.user.email}</Text>
            <TouchableOpacity
              onPress={() => this.props.dispatch({ type: SIGN_OUT })}
            >
              <Text style={{ fontWeight: "bold", color: "grey" }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.items ? (
          <ProfileHeader {...this.props.route.params}></ProfileHeader>
        ) : (
          <ProfileHeader
            item={{
              userId: myProfile.user,
              locationFrom: myProfile.travel?.locationFrom,
              locationTo: myProfile.travel?.locationTo,
              departure: myProfile.travel?.departure
            }}
          ></ProfileHeader>
        )}
        {this.renderItems()}
      </View>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
  item: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.3
  }
});
