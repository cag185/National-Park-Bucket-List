// THIS FILE IS FOR THE WELCOME SCREEN
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";

// get the size of the window
const windowWidth = Dimensions.get("window").width;

// expression for button click
const welcomeButtonClick = () => {
  console.log("clicked");
};

export default function Homescreen() {
  return (
    <View>
      <Text style={styles.Text}>Welcome to the National Park App!</Text>
      <Pressable style={styles.button1} onPress={welcomeButtonClick}>
        <Text style={styles.buttonText}>Let's Begin</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 15,
    margin: 20,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
  },
});
