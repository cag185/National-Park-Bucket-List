// THIS FILE IS FOR THE Stats SCREEN
import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  Switch,
} from "react-native";

// nav stuff
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// get the size of the window
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Statistics({ navigation, route }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { params } = useRoute();
  const bucketList = params?.bucketList || [];
  const beenThereList = params?.beenThereList || [];

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  console.log("params");
  console.log(route.params);
  console.log(bucketList.length());
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
          onPress={() => navigation.navigate("Wall")}
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
        <Text style={styles.listText}>Been There </Text>
      ) : (
        <Text style={styles.listText}>Bucket List </Text>
      )}
    </View>
  );
}
// <View>
//         <Text style={styles.listText}>Bucket List</Text>
//         <View style={styles.parkContainer}>
//           {bucketList.map((park, index) => (
//             <View key={index}>
//               <Text>{park}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

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
  },

  NavContainer: {
    backgroundColor: "lightgreen",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderRadius: 35,
    margin: 5,
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
  buttonText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    width: 130,
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
