import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import wallpaper from "./images/wallpaper.jpg";

const windowWidth = Dimensions.get("window").width;

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.wallpaper} source={wallpaper} />
      <Text style={styles.Text}>Welcome to the National Park App!</Text>
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
    width: windowWidth,
    height: windowWidth / 2,
  },
});
