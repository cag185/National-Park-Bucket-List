import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import wallpaper from "./images/wallpaper.jpg";
import Homescreen from "./Homescreen";
const windowWidth = Dimensions.get("window").width;

//want to add in some states to allow the page to swap between some pages

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
    <View style={styles.container}>
      <Homescreen />
      <StatusBar style="auto" />
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
  wallpaper: {
    height: windowWidth,
    alignContent: "center",
  },
});
