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
  Modal
} from "react-native";
import { debounce } from "lodash";
import { AntDesign } from "@expo/vector-icons";

import InputDestination from "../components/InputDestination";
import InputDate from "../components/InputDate";
import AddModal from "../components/AddModal";
import RecommendationList from "../components/RecommendationList";

export default class AddTripScreen extends Component {
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
      items: []
    };
  }

  onChangeText = async ({ text, type }) => {
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

  render() {
    return (
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, marginRight: 5, marginTop: 10 }}>
          <View
            style={{
              flex: 0.2,
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 5
            }}
          >
            <InputDestination
              title="From"
              placeholder="Departure"
              onChangeCountry={this.onChangeTextDelayed}
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
              flag={this.state.destinationFlag}
            ></InputDestination>
          </View>
          <View style={{ flex: 0.15 }}>
            <InputDate
              onChange={this.onChangeDate}
              setShow={() => this.setState({ showDatePicker: true })}
              {...this.state}
            ></InputDate>
          </View>
          <View
            style={{
              flex: 0.55,
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
                  renderItem={({ item }) => (
                    <RecommendationList item={item}></RecommendationList>
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
          >
            <Text
              style={{
                fontSize: 20,
                letterSpacing: 5
              }}
            >
              POST TRIP
            </Text>
          </TouchableOpacity>
          {/* <AddModal
            visible={this.state.showAddItem}
            setVisible={showAddItem => this.setState({ showAddItem })}
            addItem={item => this.addItem(item)}
          ></AddModal> */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showAddItem}
            presentationStyle="overFullScreen"
          >
            <AddModal
              setVisible={showAddItem => this.setState({ showAddItem })}
              addItem={item => this.addItem(item)}
            ></AddModal>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
