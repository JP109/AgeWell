// LandingScreen.js

import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import back from "../assets/images/chevron.png";
import front from "../assets/images/chevron-right.png";
import lock from "../assets/images/lock.png";
import about from "../assets/images/about.png";
import settings from "../assets/images/settings.png";
import wave1 from "../assets/images/wave7.png";

export default function SettingsScreen() {
  const router = useRouter();
  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.waveContainer2}>
          <Image source={wave1} style={styles.waveImage} />
        </View>
        <View style={styles.waveContainer3}>
          <Image source={wave1} style={styles.waveImage} />
        </View>
        <View style={styles.titleContainer} lightColor="#f5fbf3">
          <TouchableOpacity
            style={styles.iconContainerBack}
            onPress={() => router.push("/home")}
          >
            <Image source={back} style={styles.backButton} />
          </TouchableOpacity>
          <Text type="title" style={styles.titleText}>
            {" "}
            Settings{" "}
          </Text>
          <View style={styles.iconContainer}>
            <Image source={settings} style={styles.iconImage} />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => router.push("/privacy")}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Image source={lock} style={styles.iconImage} />
              </View>
              <Text type="title" style={styles.subtitleText}>
                Privacy Policy
              </Text>
              <View style={styles.iconContainerFront}>
                <Image source={front} style={styles.backButton} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/about")}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Image source={about} style={styles.iconImage} />
              </View>
              <Text type="title" style={styles.subtitleText}>
                About
              </Text>
              <View style={styles.iconContainerFront}>
                <Image source={front} style={styles.backButton} />
              </View>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => router.push("/about")}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Image source={question} style={styles.iconImage} />
              </View>
              <Text type="title" style={styles.titleText}>
                About
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

// Get the screen width dynamically
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  waveContainer1: {
    position: "absolute",
    top: 0,
    right: -100,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width * 0.93,
    height: height * 0.3,
  },
  waveContainer2: {
    position: "absolute",
    top: 100,
    left: -100,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width * 0.93,
    height: height * 0.3,
  },
  waveContainer3: {
    position: "absolute",
    right: -150,
    bottom: -500,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width,
    height: height * 0.4,
  },
  waveImage: {
    width: "100%", // Cover the full width of the container
    height: "100%", // Cover the full height of the container
    resizeMode: "contain", // Ensure the image covers the container without distortion
    borderRadius: 10, // Optional: Add rounded corners if needed
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5fbf3",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 25,
  },
  titleText: {
    fontSize: 25,
    color: "#69707E",
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 22,
    color: "#69707E",
    fontWeight: "bold",
  },
  rowContainer: {
    marginTop: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingLeft: 20,
    marginBottom: 35,
    borderBottomWidth: 1,
    borderColor: "#69707E",
  },
  iconContainer: {
    width: 25,
    height: 25,
    marginRight: 20,
    marginTop: 2,
  },
  iconImage: {
    maxHeight: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
  },
  iconContainerBack: {
    width: 15,
    height: 15,
    // position: "absolute",
    // left: 30,
    // top: 30,
  },
  iconContainerFront: {
    // marginTop: 8,
    // marginLeft: 10,
    width: 15,
    height: 15,
    position: "absolute",
    right: 10,
    top: 5,
  },
  backButton: {
    maxHeight: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
  },
});
