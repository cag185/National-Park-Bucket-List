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
  ScrollView,
} from "react-native";

// nav stuff
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// get the size of the window
const windowWidth = Dimensions.get("window").width;

// variables for the JSON response
// var Park_Names;
// var Park_Descriptions;

export default function Wallscreen({ navigation, data, natParks }) {
  console.log(natParks);

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>National Parks!</Text>
      <View style={styles.NavContainer}>
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
      <ScrollView>
        {data.map((park) => (
          <View style={styles.parkContainer}>
            <View style={styles.textContainer}>
              <Text key={park.id} style={styles.parkName}>
                {park.fullName}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "top",
  },
  HeaderText: {
    color: "lightgreen",
    textAlign: "center",
    fontSize: 50,
    marginTop: 5,
  },
  NavContainer: {
    backgroundColor: "lightgreen",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderRadius: 20,
    margin: 5,
  },
  button1: {
    borderRadius: 20,
    backgroundColor: "forestgreen",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: 130,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  parkContainer: {
    width: windowWidth,
    margin: 10,
    backgroundColor: "black",
  },
  textContainer: {
    backgroundColor: "white",
    margin: 5,
  },
  parkName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "white",
  },
  parkDescription: {
    fontSize: 14,
    marginTop: 3,
    marginRight: 10,
    color: "white",
  },
});
