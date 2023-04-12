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
  //use state to load in the API call request
  const [data, setData] = useState([]);
  const [natParks, setNatParks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("cachedData");
        if (cachedData !== null) {
          setData(JSON.parse(cachedData));
        } else {
          const response = await fetch(
            "https://developer.nps.gov/api/v1/parks?api_key=MH1CCK0oflseTpJ03akiKEitl2IEafgptN7QRgG1&limit=500"
          );
          if (response.status === 200) {
            const data = await response.json();
            setData(data);
            await AsyncStorage.setItem("cachedData", JSON.stringify(data));
          } else {
            console.log("Error in retrieving the data");
          }
        }
      } catch (error) {
        console.error(error);
        console.log("Error in retrieving the data");
      }
    };

    fetchData();
  }, []);

  // filter the parks by the national parks only
  console.log("Before the useEffect to limit the data");
  useEffect(() => {
    if (data.length > 0) {
      console.log("should see data here");
      console.log(data);
      const filteredData = data.filter(
        (park) => park.designation === "National Park"
      );
      //set the filtered data as a state
      setNatParks(filteredData);
    } else {
      console.log("data less than 0");
    }
  }, [data]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Wall">
          {(props) => <Wallscreen {...props} natParks={natParks} data={data} />}
        </Stack.Screen>
        <Stack.Screen name="Stats">
          {(props) => <Statistics {...props} natParks={natParks} data={data} />}
        </Stack.Screen>
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
