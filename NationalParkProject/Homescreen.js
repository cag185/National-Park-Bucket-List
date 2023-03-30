// THIS FILE IS FOR THE WELCOME SCREEN
import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";

// get the size of the window
const windowWidth = Dimensions.get("window").width;

export default function Homescreen() {
  // use state
  const [isClicked, setClick] = useState(0);
  const welcomeButtonClick = () => {
    if (isClicked === 1) {
      setClick(0);
    } else {
      setClick(1);
    }
    console.log("clicked: ", isClicked);
  };
  return (
    <View>
      <Text style={styles.Text}>Welcome to the National Park App!</Text>
      <Pressable style={styles.button1} onPress={welcomeButtonClick}>
        <Text style={styles.buttonText}>Let's Begin</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    color: "lightgreen",
    textAlign: "center",
    fontSize: 50,
  },
  button1: {
    borderRadius: 20,
    elevation: 3,
    color: "white",
    backgroundColor: "forestgreen",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 15,
    margin: 20,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
  },
});
