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
import { Divider } from "react-native-elements";

// nav stuff
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//cache lib
import AsyncStorage from "@react-native-async-storage/async-storage";
// get the size of the window
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// let bucketList = [];
// let beenThereList = [];

export default function Wallscreen({ navigation, filteredData }) {
  const [data, setData] = useState([]);
  const [bucketList, setBucketList] = useState([]);
  const [beenThereList, setBeenThereList] = useState([]);

  if (filteredData != null) {
    // do nothing
  } else {
    // data is null
  }

  // function for button - add to bucket list
  const addToBucketList = (id) => {
    if (bucketList.indexOf(id) == -1) {
      bucketList.push(id);
      console.log(bucketList);
    }
  };

  // function for button - add to been there list
  const addToBeenThere = (id) => {
    // get the index of the id in the bucket list if exists
    id_in_bucket = bucketList.indexOf(id);

    if (beenThereList.indexOf(id) == -1) {
      if (id_in_bucket == -1) {
        // allowed to add to been there without checking
        beenThereList.push(id);
      } else if (id_in_bucket >= 0) {
        // add to the been there
        beenThereList.push(id);
        // remove from the bucket list - remove one item
        bucketList.splice(id_in_bucket, 1);
      }
      console.log(beenThereList);
    }
  };
  useEffect(() => {
    console.log("Bucket List IDs: ");
    console.log(bucketList);
    console.log("Been there IDs: ");
    console.log(beenThereList);
  }, [bucketList, beenThereList]);

  useEffect(() => {
    let keys = [];
    let cache_item;
    const fetchCache = async () => {
      try {
        keys = await AsyncStorage.getAllKeys();
        cache_item = await AsyncStorage.getItem(keys[0]);
        const parsedItem = await JSON.parse(cache_item);
        setData(parsedItem);
      } catch (error) {}
    };
    // call the function
    fetchCache();
  }, []);

  if (data != null) {
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
            onPress={() =>
              navigation.navigate("Stats", {
                bucketList: bucketList,
                beenThereList: beenThereList,
              })
            }
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
                <Text key={park.name} style={styles.parkName}>
                  {park.fullName}
                </Text>
                <Text style={styles.parkDescription}>{park.description}</Text>
                <Divider key={index} style={styles.DividerStyle}></Divider>
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    name="addToBucketList"
                    style={styles.button2}
                    onPress={() => addToBucketList(park.fullName)}
                  >
                    <Text style={styles.button2Text}>Add 2 Bucket List!</Text>
                  </Pressable>
                  <Pressable
                    name="addToBeenThere"
                    style={styles.button2}
                    onPress={() => addToBeenThere(park.fullName)}
                  >
                    <Text style={styles.button2Text}>Add 2 Been There!</Text>
                  </Pressable>
                </View>
                <Divider key={park.id} style={styles.DividerStyle}></Divider>
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
    backgroundColor: "#242629",
    alignItems: "center",
    justifyContent: "top",
    marginBottom: 0,
    height: windowHeight,
  },
  HeaderText: {
    color: "rgb(254, 216, 117)",

    textAlign: "center",
    fontSize: 50,
    marginTop: 35,
  },
  scrollBox: {
    marginBottom: 0,
  },

  NavContainer: {
    backgroundColor: "rgb(254, 216, 117)",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderRadius: 20,
    margin: 5,
  },
  button1: {
    borderRadius: 20,
    backgroundColor: "#F9925E",
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
  button2: {
    borderRadius: 20,
    backgroundColor: "#494d53",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: windowWidth / 3,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  button2Text: {
    fontSize: 15,
    color: "lightgreen",
    textAlign: "center",
  },
  parkContainer: {
    width: windowWidth,
    margin: 10,
    marginBottom: 150,
    backgroundColor: "#242629",
    justifyContents: "center",
  },
  textContainer: {
    flexDirection: "column",
    backgroundColor: "#242629",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  parkName: {
    fontSize: 23,
    fontFamily: "Helvetica-Bold",
    alignSelf: "center",
    textAlign: "center",
    color: "lightgreen",
  },
  parkImage: {
    width: windowWidth - windowWidth / 4,
    height: windowWidth - windowWidth / 4,
    marginBottom: 10,
    borderRadius: 15,
  },

  parkDescription: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
    color: "#ffeeda",
  },
  DividerStyle: {
    marginTop: 10,
    backgroundColor: "lightgreen",
    height: 1,
    width: windowWidth - windowWidth / 6,
    marginBottom: 10,
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
