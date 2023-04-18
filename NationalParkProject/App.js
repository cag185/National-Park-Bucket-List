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
            // console.log(data, data);
            console.log("Data set");
            for (let i = 0; i < data.data.length; i++) {
              const fullname = data.data[i].fullName;
              // console.log(fullname);
            }
          });
      } catch (error) {
        // error fetching data
      }
    };
    fetchData();
    console.log("Done fetching data");
    // check to see if there is data
    const fd = data.filter((park) => park.designation === "National Park");
    if (fd !== null) {
      // console.log(filteredData);
      setFilterdData(fd);
      console.log("filtered data Proof");
      console.log("type", typeof fd);
      for (let i = 0; i < fd.length; i++) {
        const fullname = fd[i].fullName;
        // console.log(fullname); Test successful
      }

      // once we have filtered data lets store it in the cache
      const setCache = async () => {
        try {
          const data_to_set = JSON.stringify(filteredData);
          await AsyncStorage.setItem("FILTERED_DATA", data_to_set);
          console.log("Cache set");
        } catch (error) {
          console.log("Error with setting the cache: ", error);
        }
      };
      setCache();
    } else {
      console.log("Filtered Data null");
    }
  }, []); // empty array is the dependency array. Empty dependency array makes the useeffect occur once rather than every cycle that gets updated

  // test to see the filter data
  for (let i = 0; i < filteredData.length; i++) {
    // console.log(filteredData[i].name); // another test
  }

  // test to see if the cache has the item we tried to store
  const test = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      // console.log(keys);
      // console.log(keys[0]);
      d = await AsyncStorage.getItem(keys[1]);
      d = JSON.parse(d);
      // console.log(d);
    } catch (error) {
      console.log(error);
    }
  };
  test();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen
          name="Wall"
          component={Wallscreen}
          filteredData={filteredData}
        />
        <Stack.Screen name="Stats" component={Statistics} />
      </Stack.Navigator>
    </NavigationContainer>
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
  wallpaper: {
    height: windowWidth,
    alignContent: "center",
  },
});
