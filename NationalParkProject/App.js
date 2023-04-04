import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import wallpaper from "./images/wallpaper.jpg";

import Homescreen from "./Homescreen";
import Wallscreen from "./Wallscreen";
import Statistics from "./Statistics";

const windowWidth = Dimensions.get("window").width;

//want to add in some states to allow the page to swap between some pages
const Stack = createStackNavigator();
export default function App() {
  //use state to change the state that controls the pages
  const [pageNum, setPageNum] = useState(0);
  const loadPage = () => {
    if (pageNum === 0) {
      setPageNum(1);
    } else if (pageNum === 1) {
      setPageNum(2);
    } else if (pageNum === 2) {
      setPageNum(3);
    }
    console.log("Page number: ", pageNum);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <View style={styles.container}>
          <Stack.Screen name="Home" component={Homescreen} />
          <Stack.Screen name="Wall" component={Wallscreen} />
          <Stack.Screen name="Stats" component={Statistics} />
        </View>
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
