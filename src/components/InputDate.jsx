import React, { useState } from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import Moment from "moment";

export default function InputDate(props) {
  const { departureDate, showDatePicker, setShow, onChange } = props;

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "center",
        width: "95%",
        borderBottomWidth: 1,
        borderBottomColor: "grey"
      }}
    >
      <Text style={{ flex: 0.5, textAlignVertical: "center", marginLeft: 10 }}>
        Departure Date
      </Text>
      <TouchableOpacity
        onPress={setShow}
        style={{
          flex: 0.5,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <Text style={{ letterSpacing: 2 }}>
          {Moment(departureDate).format("dddd, MMMM Do YYYY")}
        </Text>
        <AntDesign name="calendar" size={25} color="black" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={departureDate}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
