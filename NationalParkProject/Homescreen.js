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
import { Divider } from "react-native-elements";

// nav stuff
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// get the size of the window
const windowWidth = Dimensions.get("window").width;

export default function Homescreen({ navigation }) {
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
    <View style={styles.container}>
      <Text style={styles.Text}>Welcome to the National Park App!</Text>
      <Pressable
        style={styles.button1}
        onPress={() => navigation.navigate("Wall")}
      >
        <Text style={styles.buttonText}>Let's Begin</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242629",
    alignItems: "center",
    justifyContent: "center",
  },
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
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#242424",
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
  },
});
