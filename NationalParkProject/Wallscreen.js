// THIS FILE IS FOR THE WALL SCREEN
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";

// nav stuff
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// get the size of the window
const windowWidth = Dimensions.get("window").width;

// variables for the JSON response
var Park_Names;
var Park_Descriptions;

export default function Wallscreen({ navigation }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // api command
  const request =
    "https://developer.nps.gov/api/v1/parks?api_key=MH1CCK0oflseTpJ03akiKEitl2IEafgptN7QRgG1";

  // API call code

  useEffect(() => {
    fetch(request)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response not ok");
        }
      })
      .then((data) => {
        Park_Names = data.data.map((park) => park.fullName);
        Park_Descriptions = data.data.map((park) => park.description);
        console.log(Park_Names);
        console.log(Park_Descriptions);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Wallscreen!</Text>
      <Text style={styles.Text}>Should see parks here</Text>
      <Pressable
        style={styles.button1}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </Pressable>
      <Pressable
        style={styles.button1}
        onPress={() => navigation.navigate("Stats")}
      >
        <Text style={styles.buttonText}>Stats</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
  },
  buttonText: {
    fontSize: 25,
    color: "white",
  },
});
