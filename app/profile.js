import { ThemedText } from "@/components/ThemedText";
import { Dimensions, StyleSheet } from "react-native";
import { Text, Image } from "react-native";

import { View } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import oldWoman from "../assets/images/oldWoman.png";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
// @ts-ignore

export default function ProfileScreen() {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://agewell.onrender.com/api/users/");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching userData:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <LinearGradient
      colors={["#cdf7c0", "#b6e7f5"]} // Start color and end color for the gradient
      style={styles.mainContainer} // Apply the gradient to the main container
    >
      <View style={styles.profileContainer}>
        {/* Left column */}
        <View style={styles.leftColumn}>
          <View style={styles.row}>
            <Text style={styles.titleText}>Name</Text>
            <Text style={styles.subtitleText}>{userData?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>Joined</Text>
            <Text style={styles.subtitleText}>{userData?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>Emergency Contact</Text>
            <Text style={styles.subtitleText}>{userData?.name}</Text>
          </View>
        </View>

        {/* Right column with circle image */}
        <View style={styles.rightColumn}>
          <View style={styles.circle}>
            <Image source={oldWoman} style={styles.circleImage} />
          </View>
        </View>
      </View>

      <View style={styles.vitalsGrid}>
        <View style={styles.vitalsContainer}>
          <Text style={styles.subtitleText}>Name</Text>
          <Text style={styles.titleText}>Name</Text>
        </View>
        <View style={styles.vitalsContainer}>
          <Text style={styles.subtitleText}>Name</Text>
          <Text style={styles.titleText}>Name</Text>
        </View>
      </View>
      <View style={styles.vitalsGrid}>
        <View style={styles.vitalsContainer}>
          <Text style={styles.subtitleText}>Name</Text>
          <Text style={styles.titleText}>Name</Text>
        </View>
        <View style={styles.vitalsContainer}>
          <Text style={styles.subtitleText}>Name</Text>
          <Text style={styles.titleText}>Name</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

// Get the screen width dynamically
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5fbf3",
    paddingTop: 10, // Adds space at the top of the screen (adjust as needed)
    paddingHorizontal: 16, // Adds some padding on the left and right
  },
  profileContainer: {
    width: "90%", // 90% of the screen width
    height: width * 0.6, // Fixed height of 20 (you can adjust this if needed)
    borderRadius: 20, // Border radius for rounded corners (adjust as needed)
    marginHorizontal: "5%", // To center the container horizontally, using 5% on both sides
    paddingHorizontal: "5%", // To center the container horizontally, using 5% on both sides
    paddingVertical: "10%", // To center the container horizontally, using 5% on both sides
    backgroundColor: "#fff",
    marginTop: 50,

    display: "flex",
    flexDirection: "row",
  },
  leftColumn: {
    flex: 1, // Takes up the remaining space
    justifyContent: "flex-start", // Distribute space between rows
  },
  row: {
    flexDirection: "column", // Makes each row have two subrows
    justifyContent: "space-between", // Ensure the title and subtitle are spaced out
    marginBottom: 10, // Adds space between rows
  },
  rightColumn: {
    justifyContent: "center",
    alignItems: "center", // Centers the circle vertically and horizontally
    flex: 1, // Adjust width of the circle container
  },
  circle: {
    width: 120, // Increased size of the circle (previously was 100)
    height: 120, // Increased size of the circle (previously was 100)
    borderRadius: 60, // Make it a perfect circle (half of the width/height)
    overflow: "hidden", // Ensures the image stays within the circle
    borderWidth: 2, // Optional: Add a border to the circle
    borderColor: "#ccc", // Optional: Circle border color
  },
  circleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image covers the whole circle
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6e7880",
  },
  titleText: {
    fontSize: 14,
    color: "#6e7880",
  },
  vitalsGrid: {
    width: "100%",
    flexDirection: "row", // This ensures side-by-side layout
    justifyContent: "space-evenly", // Distributes space between the two containers
    marginTop: 20, // Optional: adds space between the profile and vitals grid
  },
  vitalsContainer: {
    width: "40%",
    height: width * 0.4,
    borderRadius: 20,
    // marginHorizontal: "5%",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    // iOS Shadow
    shadowColor: "#000", // Shadow color (black)
    shadowOffset: { width: 0, height: 4 }, // Shadow position (move down by 4px)
    shadowOpacity: 0.3, // Shadow opacity (0 to 1, where 1 is fully opaque)
    shadowRadius: 6, // Radius of the shadow blur (larger number = softer shadow)

    // Android Shadow
    elevation: 5, // Elevation for Android (higher number = more intense shadow)
  },
  circle: {
    width: 135,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  circleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
