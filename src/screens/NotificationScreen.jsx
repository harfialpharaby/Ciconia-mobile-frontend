import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  FlatList,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { BASE_URL } from "../url";
import CartList from "../components/CartList";
import CartModal from "../components/CartModal";

const statuses = [
  { key: "all", name: "all" },
  { key: "open", name: "open", authorized: "travel", color: "#e74c3c" },
  {
    key: "offered",
    name: "offered",
    authorized: "buyer",
    color: "#e67e22"
  },
  {
    key: "pendingPurchase",
    name: "pending purchase",
    authorized: "buyer",
    color: "#f1c40f"
  },
  {
    key: "verification",
    name: "pending verification",
    authorized: "travel",
    color: "#2980b9"
  },
  {
    key: "pendingDelivery",
    name: "pending delivery",
    authorized: "travel",
    color: "#8e44ad"
  },
  { key: "completed", name: "completed", color: "#2ecc71" }
];

class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      showDetail: null,
      showModal: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this.fetchOpenNotification();
    this.fetchPendingVerification();
  }

  componentWillUnmount() {
    this.setState({ notifications: [] });
  }

  fetchOpenNotification = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const userEmail = await AsyncStorage.getItem("email");
      const response = await fetch(`${BASE_URL}/carts/user`, {
        headers: {
          token: userToken
        }
      });
      if (response.ok) {
        const openCarts = await response.json();
        const normalizedCarts = [];
        for (const key in openCarts) {
          normalizedCarts.push(
            ...openCarts[key].filter(cart => {
              if (cart.status === "pending verification") {
                if (cart.buyerId.email === userEmail) {
                  return false;
                }
                return true;
              } else {
                return true;
              }
            })
          );
        }

        this.setState({
          notifications: [...this.state.notifications, ...normalizedCarts]
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchPendingVerification = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const userEmail = await AsyncStorage.getItem("email");
      const response = await fetch(`${BASE_URL}/carts/travel`, {
        headers: {
          token: userToken
        }
      });
      if (response.ok) {
        const pendingVerify = await response.json();
        this.setState({
          notifications: [
            ...pendingVerify,
            ...this.state.notifications.filter(
              notif => notif.buyerId.email !== userEmail
            )
          ]
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.setState({ notifications: [] });
    this.fetchOpenNotification();
    this.fetchPendingVerification();
    this.setState({ refreshing: false });
  };

  render() {
    return !this.state.notifications.length ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AntDesign name="notification" size={30} color="black"></AntDesign>
        <Text style={{ letterSpacing: 1 }}>No Order Yet</Text>
      </View>
    ) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          numColumns={2}
          key={2}
          data={this.state.notifications}
          renderItem={({ item }) => (
            <CartList
              item={item}
              showModal={this.state.showModal}
              setShowModal={showModal => this.setState({ showModal })}
              setShowDetail={showDetail => this.setState({ showDetail })}
            ></CartList>
          )}
          keyExtractor={item => item._id}
        />
        {this.state.showModal && (
          <CartModal
            item={this.state.showDetail}
            showModal={this.state.showModal}
            setShowDetail={showDetail => this.setState({ showDetail })}
            setShowModal={showModal => this.setState({ showModal })}
            statuses={statuses.slice(1)}
            isWatcher={false}
          ></CartModal>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(NotificationScreen);
