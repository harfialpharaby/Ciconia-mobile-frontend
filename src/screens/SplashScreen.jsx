import React from "react";
import { View, Text, ImageBackground } from "react-native";

export default function SplashScreen(props) {
  const { text } = props;
  return (
    <ImageBackground
      style={{ flex: 1, width: "100%", justifyContent: "center" }}
      source={require("../../assets/splash.png")}
    >
      <View style={{ flex: 0.4, justifyContent: "flex-end" }}>
        <Text style={{ textAlign: "center", letterSpacing: 3 }}>
          {text ?? "Loading..."}
        </Text>
      </View>
    </ImageBackground>
  );
}
