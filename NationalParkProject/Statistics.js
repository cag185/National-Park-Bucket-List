// THIS FILE IS FOR THE Stats SCREEN
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
  Switch,
} from "react-native";

// nav stuff
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// get the size of the window
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Statistics({ navigation, route }) {
  let bucketList1 = route.params.bucketList;
  const beenThereList1 = route.params["beenThereList"];

  const [isEnabled, setIsEnabled] = useState(false);
  const [bucketList, setBucketList] = useState([...bucketList1]);
  const [beenThereList, setBeenThereList] = useState([...beenThereList1]);

  const { params } = useRoute();
  // useEffect(() => {
  const initLists = () => {
    for (let i = 0; i < bucketList1.length; i++) {
      bucketList.push(bucketList1[i]);
    }
    for (let i = 0; i < beenThereList1.length; i++) {
      beenThereList.push(beenThereList1[i]);
    }
    // beenThereList.push(beenThereList1);
  };
  // call the funciton
  useEffect(() => {
    // initLists();
  }, [bucketList1, beenThereList1]);

  // }, []);
  // }, [route.params["bucketList"], route.params["beenThere"]]);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // console.log("bucketList: ", bucketList);

  function removePark_bucket(parkName) {
    console.log("inside the bucket remove");
    list1 = bucketList;
    console.log("created a copy of the bucket list");
    idx = list1.indexOf(parkName);
    console.log("got the index");
    list1.splice(idx, 1);
    console.log("spliced the index with the rest of the list");
    setBucketList([]);
    console.log("set the bucket list to an empty array");
    setBucketList([...list1]);
    console.log(
      "set the bucket list with the copy of the elements in the list"
    );
  }
  function removePark_beenThere(parkName) {
    list = beenThereList;
    idx = list.indexOf(parkName);
    list.splice(idx, 1);
    setBucketList([...list]);
  }

  // console.log("params");
  // console.log(bucketList.length);
  // console.log("bucketList: ");
  // console.log(bucketList);
  // console.log("been there list: ");
  // console.log(route.params["beenThereList"]);
  console.log(bucketList);
  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>Stats!</Text>
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
            navigation.navigate("Wall", {
              bucketList: bucketList,
              beenThereList: beenThereList,
            })
          }
        >
          <Text style={styles.buttonText}>Wall</Text>
        </Pressable>
      </View>
      <Switch
        trackColor={{ false: "#767577", true: "#EDA565" }}
        thumbColor={isEnabled ? "white" : "#f4f3f4"}
        ios_backgroundColor="lightgreen"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      {isEnabled ? (
        <View>
          <Text style={styles.listText}>Been There List</Text>
          <ScrollView>
            <View style={styles.parkContainer}>
              {beenThereList.map((park, index) => (
                <View key={index}>
                  <View style={styles.nameRemove}>
                    <Text style={styles.parkName}>{park}</Text>
                    <Pressable
                      onPress={() => removePark_beenThere(park)}
                      style={styles.button2}
                    >
                      <Text style={styles.buttonText2}>-</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text style={styles.listText}>Bucket List</Text>
          <ScrollView>
            <View style={styles.parkContainer}>
              {bucketList.map((park, index) => (
                <View key={index}>
                  <View style={styles.nameRemove}>
                    <Text style={styles.parkName}>{park}</Text>
                    <Pressable
                      onPress={() => removePark_bucket(park)}
                      style={styles.button2}
                    >
                      <Text style={styles.buttonText2}>-</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242629",
    alignItems: "center",
    justifyContent: "top",
    marignBottom: 0,
    height: windowHeight,
  },
  HeaderText: {
    marginTop: 35,
    color: "lightgreen",
    textAlign: "center",
    fontSize: 50,
  },
  listText: {
    marginTop: 10,
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },

  NavContainer: {
    backgroundColor: "lightgreen",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderRadius: 35,
    margin: 5,
  },
  parkName: {
    color: "#EDA565",
    textAlign: "center",
    fontSize: 24,
  },
  Text: {
    color: "lightgreen",
    textAlign: "center",
    fontSize: 50,
  },
  button1: {
    borderRadius: 20,
    elevation: 3,
    color: "white",
    backgroundColor: "forestgreen",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  nameRemove: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  button2: {
    borderRadius: 20,
    elevation: 3,
    // color: "white",
    // backgroundColor: "#EDA565",
    backgroundColor: "rgb(255, 50, 0)",
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "center",
    margin: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    width: 35,
    height: 35,
    textAlign: "center",
    // marginLeft: 80,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    width: 130,
    textAlign: "center",
  },
  buttonText2: {
    fontSize: 30,
    color: "white",
    padding: 0,
    // width: 130,
    textAlign: "center",
  },
  parkContainer: {
    width: windowWidth,
    margin: 10,
    marginBottom: 150,
    backgroundColor: "#242629",
    justifyContents: "center",
  },
});
