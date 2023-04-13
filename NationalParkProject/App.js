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
  // clear the cache first
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  clearAsyncStorage();

  //use state to load in the API call request
  const [data, setData] = useState([]);
  const [natParks, setNatParks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("cachedData");
        if (cachedData !== null) {
          // filter the data
          setData(JSON.parse(cachedData));
          console.log(data);
          // Definitely have data here
          // const filteredData = data.filter(function (park) {
          //   if (park.designation === "National Park") {
          //     return park;
          //   }
          // });
          // setData(filteredData);
          // Definitely have data here
          console.log("Data was set");
          console.log(data);
        } else {
          console.log("cache empty, making request");
          const response = await fetch(
            "https://developer.nps.gov/api/v1/parks?api_key=MH1CCK0oflseTpJ03akiKEitl2IEafgptN7QRgG1&limit=500"
          );
          if (response.status === 200) {
            const data = await response.json();
            // see if we can filter the data
            try {
              let filteredData1 = data.filter(function (park1) {
                return park1.designation === "National Park";
              });
            } catch (error) {
              console.error("error here: ", error);
            }

            setData(data);
            console.log("Data set");
            // console.log(data);
            // Have data here since clearing the cache
            // need to filter the data
            await AsyncStorage.setItem("cachedData", JSON.stringify(data));

            // see if the cached data is set
            console.log("Retrieving the cached data");
            const cachedData = await AsyncStorage.getItem("cachedData");
            // console.log(cachedData);
            // see if we can filter the data
            try {
              const cachedJSON = JSON.parse(cachedData);
              const filteredData1 = cachedJSON.filter(
                (park) => park.fullName === "Acadia National Park"
              );
            } catch (error) {
              console.error("error here: ", error);
              console.log("Could not filter the cached data");
            }
            // cached data confirmed
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

  // // filter the parks by the national parks only
  // console.log("Before the useEffect to limit the data");
  // useEffect(() => {
  //   console.log("should see data here");
  //   // console.log(data);
  //   const filteredData = data.filter(
  //     (park) => park.designation === "National Park"
  //   );
  //   //set the filtered data as a state
  //   setNatParks(filteredData);
  // }, [data]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Wall">
          {(props) => <Wallscreen {...props} data={data} />}
        </Stack.Screen>
        <Stack.Screen name="Stats">
          {(props) => <Statistics {...props} data={data} />}
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
