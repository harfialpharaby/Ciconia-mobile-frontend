import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  FlatList,
  Keyboard,
  Platform,
  Dimensions,
  Modal,
  Alert
} from "react-native";
import { debounce } from "lodash";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";

import { addBulkItems } from "../store/actions/items";
import { addTravel } from "../store/actions/travels";
import InputDestination from "../components/InputDestination";
import InputDate from "../components/InputDate";
import InputItemForm from "../components/InputItemForm";
import RecommendationList from "../components/RecommendationList";

class AddTripScreen extends Component {
  constructor(props) {
    super(props);
    this.onChangeTextDelayed = debounce(this.onChangeText, 1000);
    this.compass = [
      "north",
      "east",
      "west",
      "south",
      "northeast",
      "southeast",
      "southwest",
      "northwest"
    ];
    this.state = {
      departureFlag: null,
      destinationFlag: null,
      departureDate: new Date(),
      showDatePicker: false,
      showAddItem: false,
      departure: { city: null, country: null },
      destination: { city: null, country: null },
      items: []
    };
  }

  initAndNavigate = () => {
    this.setState({
      departureFlag: null,
      destinationFlag: null,
      departureDate: new Date(),
      showDatePicker: false,
      showAddItem: false,
      departure: { city: null, country: null },
      destination: { city: null, country: null },
      items: []
    });
    this.props.navigation.navigate("TravelerList");
  };
  onChangeCity = ({ text, type }) => {
    this.setState({
      [type.toLowerCase()]: {
        ...this.state[type.toLowerCase()],
        city: text
      }
    });
  };

  onChangeText = async ({ text, type }) => {
    this.setState({
      [type.toLowerCase()]: {
        ...this.state[type.toLowerCase()],
        country: text
      }
    });
    text = text.toLowerCase();
    let normalizedCountry = text.toLowerCase();
    this.compass.forEach(c => {
      normalizedCountry = normalizedCountry.replace(c, "");
    });

    let response = await fetch(
      `https://restcountries.eu/rest/v2/name/${normalizedCountry.trim()}`
    );
    if (response.ok) {
      let json = await response.json();
      if (json.length) {
        for (let i = 0; i < json.length; i++) {
          if (
            json[i]?.alpha2Code &&
            json[i]?.demonym.toLowerCase().includes(text)
          ) {
            let flagUrl = `https://www.countryflags.io/${json[i]?.alpha2Code}/flat/64.png`;
            if (type === "Departure") {
              this.setState({ departureFlag: flagUrl });
            } else {
              this.setState({ destinationFlag: flagUrl });
            }
            break;
          }
        }
      }
    } else {
      if (type === "Departure") {
        this.setState({ departureFlag: null });
      } else {
        this.setState({ destinationFlag: null });
      }
    }
  };

  onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.departureDate;

    this.setState({
      showDatePicker: Platform.OS === "ios",
      departureDate: currentDate >= new Date() ? currentDate : new Date()
    });
  };

  addItem = item => {
    this.setState({
      items: [item, ...this.state.items]
    });
  };

  validateInput = () => {
    if (
      !this.props.myTravel &&
      (!this.state.departureDate ||
        !this.state.departure.city ||
        !this.state.departure.country ||
        !this.state.destination.city ||
        !this.state.destination.country)
    ) {
      Alert.alert(
        "Alert!",
        "Fill all trip data except item in order to save trip!"
      );
    } else {
      if (this.props.myTravel) {
        this.props.dispatch(addBulkItems(this.state.items, "travel"));
      } else {
        this.props.dispatch(addTravel(this.state));
      }
      this.initAndNavigate();
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, marginRight: 5, marginTop: 10 }}>
          {!this.props.myTravel && (
            <View style={{ flex: 0.35 }}>
              <View
                style={{
                  flex: 0.55,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 5
                }}
              >
                <InputDestination
                  title="From"
                  placeholder="Departure"
                  onChangeCountry={this.onChangeTextDelayed}
                  onChangeCity={this.onChangeCity}
                  flag={this.state.departureFlag}
                ></InputDestination>
                <View
                  style={{
                    flex: 0.1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <AntDesign name="right" size={30} color="black" />
                </View>
                <InputDestination
                  title="To"
                  placeholder="Destination"
                  onChangeCountry={this.onChangeTextDelayed}
                  onChangeCity={this.onChangeCity}
                  flag={this.state.destinationFlag}
                ></InputDestination>
              </View>
              <View style={{ flex: 0.45 }}>
                <InputDate
                  onChange={this.onChangeDate}
                  setShow={() => this.setState({ showDatePicker: true })}
                  {...this.state}
                ></InputDate>
              </View>
            </View>
          )}
          <View
            style={{
              flex: this.props.myTravel ? 1 : 0.55,
              margin: 10
            }}
          >
            {!this.state.items.length ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ showAddItem: true })}
                >
                  <AntDesign name="pluscircleo" size={40} color="#00adee" />
                </TouchableOpacity>
                <Text
                  style={{ textAlign: "center", marginTop: 10, width: "50%" }}
                >
                  Add Recommendation Item from Departure Place
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10
                  }}
                  onPress={() => this.setState({ showAddItem: true })}
                >
                  <Text style={{ textAlignVertical: "bottom" }}>
                    Recommendation Items in Departure Place
                  </Text>
                  <View style={{ justifyContent: "flex-end", marginRight: 20 }}>
                    <AntDesign name="plussquareo" size={25} color="black" />
                  </View>
                </TouchableOpacity>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ flex: 0.9 }}
                  data={this.state.items}
                  renderItem={({ item, index }) => (
                    <RecommendationList
                      item={item}
                      index={index}
                      remove={delId =>
                        this.setState({
                          items: this.state.items.filter(
                            (item, index) => index != delId
                          )
                        })
                      }
                    ></RecommendationList>
                  )}
                  keyExtractor={(item, index) => `${item.name}${index}`}
                />
              </View>
            )}
          </View>
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
            onPress={this.validateInput}
          >
            <Text
              style={{
                fontSize: 20,
                letterSpacing: 5
              }}
            >
              {this.props.myTravel ? "ADD RECOMMENDATION" : "POST TRIP"}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showAddItem}
            presentationStyle="overFullScreen"
          >
            <InputItemForm
              setVisible={showAddItem => this.setState({ showAddItem })}
              addItem={item => this.addItem(item)}
            ></InputItemForm>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps({ user }) {
  return { myTravel: user.myProfile?.travel };
}

export default connect(mapStateToProps)(AddTripScreen);
