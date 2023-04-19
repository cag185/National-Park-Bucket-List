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
//cache lib
import AsyncStorage from "@react-native-async-storage/async-storage";
// get the size of the window
const windowWidth = Dimensions.get("window").width;

export default function Wallscreen({ navigation, filteredData }) {
  const [data, setData] = useState([]);
  console.log("Inside the wallscreen app");

  if (filteredData != null) {
    // console.log(filteredData);
  } else {
    console.log("Filtered Data not passed through to wallscreen from app.js");
  }
  useEffect(() => {
    let keys = [];
    let cache_item;
    const fetchCache = async () => {
      try {
        keys = await AsyncStorage.getAllKeys();
        console.log(keys);
        cache_item = await AsyncStorage.getItem(keys[0]);
        const parsedItem = await JSON.parse(cache_item);
        // console.log(parsedItem);
        console.log("parsedItem was parsed");
        console.log(parsedItem.length);
        setData(parsedItem);
        // console.log(parsed_item);
      } catch (error) {
        console.log("Error with retrieving item from the cache: ", error);
      }
    };
    // call the function
    fetchCache();
    console.log("data cache retrieved and set inside wallscreen");
  }, []);

  if (data != null) {
    console.log("We have accurate data");
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
        <View>
          <ScrollView>
            {data.map((park, index) => (
              <Text key={index} style={styles.parkName}>
                {park.fullName}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
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

// {
//   // place to start the mappings of all the names, images, and descriptions
//   data.map((park) => (
//     <View style={styles.parkContainer}>
//       <Text style={styles.parkName}>{park}</Text>
//       <Text style={styles.parkDescription}></Text>
//     </View>
//   ))
// }
