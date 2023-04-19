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
const windowHeight = Dimensions.get("window").height;

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
        // console.log(parsedItem);
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
        <View style={styles.parkContainer}>
          <ScrollView style={styles.scrollBox}>
            {data.map((park, index) => (
              <View key={index} style={styles.textContainer}>
                <Image
                  source={{ uri: park.images[0].url }}
                  style={styles.parkImage}
                />
                <Text key={index} style={styles.parkName}>
                  {park.fullName}
                </Text>
                <Text key={index} style={styles.parkDescription}>
                  {park.description}
                </Text>
              </View>
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
    marginBottom: 0,
    height: windowHeight,
  },
  HeaderText: {
    color: "lightgreen",
    textAlign: "center",
    fontSize: 50,
    marginTop: 35,
  },
  scrollBox: {
    marginBottom: 0,
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
    marginBottom: 150,
    backgroundColor: "black",
    justifyContents: "center",
  },
  textContainer: {
    flexDirection: "column",
    backgroundColor: "black",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  parkName: {
    fontSize: 23,
    fontFamily: "Helvetica-Bold",
    alignSelf: "center",
    color: "rgb(254, 216, 117)",
  },
  parkImage: {
    width: windowWidth - windowWidth / 4,
    height: windowWidth - windowWidth / 4,
    marginBottom: 10,
    borderRadius: 10,
  },

  parkDescription: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "flex-start",
    color: "#ffeeda",
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
