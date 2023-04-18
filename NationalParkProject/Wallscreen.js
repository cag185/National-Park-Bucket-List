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

// variables for the JSON response
// var Park_Names;
// var Park_Descriptions;

export default function Wallscreen({ navigation }) {
  const [data, setData] = useState([]);

  // api command
  const request =
    "https://developer.nps.gov/api/v1/parks?api_key=MH1CCK0oflseTpJ03akiKEitl2IEafgptN7QRgG1&limit=500";

  useEffect(() => {
    let keys = [];
    let cache_item;
    const fetchCache = async () => {
      try {
        keys = await AsyncStorage.getAllKeys();
        console.log(keys);
        cache_item = await AsyncStorage.getItem(keys[0]);
        cache_item = JSON.parse(cache_item);
        setData(cache_item);
      } catch (error) {
        console.log("Error with retrieving item from the cache: ", error);
      }
    };
    // call the function
    fetchCache();
    console.log("data cache retrieved and set inside wallscreen");
  }, []);

  // second use effect -rerender on data change
  console.log("len of data: ", data.data.length);
  console.log(data.data);
  if (data.data.length > 0) {
    console.log("We have accurate data");
    console.log(data);
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
            {data.data.map((park, index) => (
              <Text key={index} style={styles.parkName}>
                Hello
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
