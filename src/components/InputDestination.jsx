import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";

export default function InputDestination(props) {
  const { title, placeholder, onChangeCountry, flag, onChangeCity } = props;
  const [focus, setFocus] = useState(false);

  return (
    <View style={{ flex: 0.4 }}>
      <Text style={focus ? styles.labelOnFocus : styles.labelOnBlur}>
        {title}
      </Text>
      <TextInput
        style={[
          { flex: 0.5 },
          styles.inputLocation,
          focus ? styles.inputOnFocus : styles.inputOnBlur
        ]}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={text => onChangeCity({ type: placeholder, text })}
      ></TextInput>
      <View
        style={[
          focus ? styles.inputOnFocus : styles.inputOnBlur,
          { flex: 0.5, flexDirection: "row", borderBottomWidth: 1 }
        ]}
      >
        <TextInput
          style={{ flex: 0.8, textAlign: "center" }}
          placeholder="Country"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChangeText={text => onChangeCountry({ type: placeholder, text })}
        ></TextInput>
        {!!flag && (
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <Image source={{ uri: flag }} style={{ flex: 0.8 }}></Image>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLocation: {
    flex: 0.45,
    textAlign: "center",
    borderBottomWidth: 1
  },
  inputOnFocus: {
    borderBottomColor: "blue"
  },
  labelOnFocus: {
    color: "blue",
    fontWeight: "bold"
  },
  inputOnBlur: {
    borderBottomColor: "grey"
  },
  labelOnBlur: {
    color: "black",
    fontWeight: "normal"
  }
});
