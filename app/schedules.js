// LandingScreen.js

import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import settings from "../assets/images/pills.png";
import wave1 from "../assets/images/wave7.png";

export default function SettingsScreen() {
  const router = useRouter();
  const [medicines, setMedicines] = useState([]);
  // Fetch the medicine data from the API
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("https://agewell.onrender.com/api/pills/");
        const data = await response.json();
        // const names = data.map((item) => item.name);
        setMedicines(data); // Assuming the response is an array of medicines
        console;
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []); // Empty dependency array means this effect runs only once on mount
  return (
    <View style={styles.mainContainer}>
      <View>
        {/* <View style={styles.waveContainer2}>
          <Image source={wave1} style={styles.waveImage} />
        </View>
        <View style={styles.waveContainer3}>
          <Image source={wave1} style={styles.waveImage} />
        </View> */}
        <View style={styles.titleContainer} lightColor="#f5fbf3">
          <Text type="title" style={styles.titleText}>
            {" "}
            Medication Schedules{" "}
          </Text>
          {/* <View style={styles.iconContainer}>
            <Image source={settings} style={styles.iconImage} />
          </View> */}
        </View>
        <View style={styles.rowContainer}>
          <ScrollView>
            {medicines.map((pill) => (
              <View style={styles.row}>
                <View style={styles.iconRow}>
                  <View style={styles.iconContainer}>
                    <Image source={settings} style={styles.iconImage} />
                  </View>
                  <Text type="title" style={styles.pillText}>
                    {pill.name}
                  </Text>
                </View>
                <Text style={styles.pillText}>{pill.schedule}</Text>
              </View>
            ))}
          </ScrollView>
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
  pillText: {
    fontSize: 20,
  },
  rowContainer: {
    marginTop: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingLeft: 5,
    paddingBottom: 5,
    marginBottom: 13,
    borderBottomWidth: 1,
    borderColor: "#c2c2c2",
    justifyContent: "space-between",
  },
  iconRow: {
    display: "flex",
    flexDirection: "row",
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
