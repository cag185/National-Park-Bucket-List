// THIS FILE IS FOR THE Stats SCREEN
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

export default function Statistics({ navigation }) {
  return (
    <View>
      <Text style={styles.Text}>Stats!</Text>
      <Pressable
        style={styles.button1}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </Pressable>
      <Pressable
        style={styles.button1}
        onPress={() => navigation.navigate("Wall")}
      >
        <Text style={styles.buttonText}>Wall</Text>
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
