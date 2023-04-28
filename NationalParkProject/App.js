import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import wallpaper from "./images/wallpaper.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Homescreen from "./Homescreen";
import Wallscreen from "./Wallscreen";
import Statistics from "./Statistics";

const windowWidth = Dimensions.get("window").width;

//want to add in some states to allow the page to swap between some pages
const Stack = createNativeStackNavigator();
export default function App() {
  //use state to load in the cached data
  const [data, setData] = useState([]);
  const [filteredData, setFilterdData] = useState([]);
  useEffect(() => {
    // use async
    const fetchData = async () => {
      try {
        const Data = fetch(
          "https://developer.nps.gov/api/v1/parks?api_key=MH1CCK0oflseTpJ03akiKEitl2IEafgptN7QRgG1&limit=500"
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Network response not ok");
            }
          })
          .then((data) => {
            setData(data.data);
          });
      } catch (error) {
        // error fetching data
      }
    };
    fetchData();
    // check to see if there is data
    const df = data;
    const fd = df.filter((park) => park.designation === "National Park");
    if (fd !== null) {
      setFilterdData(fd);
      // once we have filtered data lets store it in the cache
      const setCache = async () => {
        try {
          const data_to_set = JSON.stringify(fd);
          await AsyncStorage.setItem("FILTERED_DATA", data_to_set);
        } catch (error) {}
      };
      setCache();
    } else {
    }
  }, []); // empty array is the dependency array. Empty dependency array makes the useeffect occur once rather than every cycle that gets updated
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Homescreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Wall"
          component={Wallscreen}
          filteredData={filteredData}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stats"
          component={Statistics}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
  wallpaper: {
    height: windowWidth,
    alignContent: "center",
  },
});
