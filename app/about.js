// LandingScreen.js

import { useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import wave1 from "../assets/images/wave7.png";

export default function PrivacyScreen() {
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
          <Text type="title" style={styles.titleText}>
            {" "}
            About{" "}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.headingText}>1. Types data we collect</Text>
            <Text style={styles.bodyText}>
              Our mobile app is committed to protecting your privacy and only
              collects essential information to enhance your experience. When
              you create an account, we may ask for your name and email address,
              but you can choose to limit the personal information you provide.
              We also collect usage data, such as device ID and the features you
              access within the app, to improve our services while minimizing
              the data collected.
            </Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.headingText}>2. Use of your personal data</Text>
            <Text style={styles.bodyText}>
              We use your personal data to provide and enhance our services,
              ensuring a better user experience. Your information may be used
              for account management, to facilitate in-app features, and to
              communicate important updates or promotional offers that may be of
              interest to you, provided you have opted in to receive such
              communications.
            </Text>
          </View>
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
    bottom: -200,
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
    color: "#333",
    fontWeight: "bold",
  },
  headingText: {
    fontSize: 19,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 16,
  },
  rowContainer: {
    marginTop: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingLeft: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  iconContainer: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 2,
  },
  iconImage: {
    maxHeight: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
  },
});
