import { ThemedText } from "@/components/ThemedText";
import { Dimensions, StyleSheet } from "react-native";
import { Text, Image, TouchableOpacity } from "react-native";

import { View } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import oldWoman from "../assets/images/oldWoman.png";
import darkGuy from "../assets/images/darkguy.png";
import darkWoman from "../assets/images/darkwoman.png";
import oldMan from "../assets/images/oldman.png";
import punjabi from "../assets/images/punjabi.png";
import whiteGuy from "../assets/images/whiteguy.png";
import whiteWoman from "../assets/images/whitewoman.png";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAvatar } from "./AvatarContext"; // Import useAvatar hook
// @ts-ignore

export default function AvatarScreen() {
  const router = useRouter();
  const [currentAvatar, setCurrentAvatar] = useState(oldWoman);
  //   const { currentAvatar, handleImageChange } = useAvatar();
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
  //   // Handle button clicks to change the avatar image
  const handleImageChange = (image) => {
    setCurrentAvatar(image); // Update the avatar based on the clicked image
  };
  return (
    <View
      style={styles.mainContainer} // Apply the gradient to the main container
    >
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
        <View style={styles.rightColumn}>
          <View style={styles.circle}>
            <Image source={currentAvatar} style={styles.circleImage} />
          </View>
          <Text style={styles.boldText}>Current Avatar</Text>
        </View>
      </View>

      <View style={styles.vitalsGrid}>
        <TouchableOpacity
          style={styles.vitalsContainer}
          onPress={() => handleImageChange(darkGuy)}
        >
          <Image source={darkGuy} style={styles.circleImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vitalsContainer}
          onPress={() => handleImageChange(darkWoman)}
        >
          <Image source={darkWoman} style={styles.circleImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.vitalsGrid}>
        <TouchableOpacity
          style={styles.vitalsContainer}
          onPress={() => handleImageChange(punjabi)}
        >
          <Image source={punjabi} style={styles.circleImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vitalsContainer}
          onPress={() => handleImageChange(oldMan)}
        >
          <Image source={oldMan} style={styles.circleImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.vitalsGrid}>
        <TouchableOpacity
          style={styles.vitalsContainer}
          onPress={() => handleImageChange(whiteGuy)}
        >
          <Image source={whiteGuy} style={styles.circleImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vitalsContainer}
          onPress={() => handleImageChange(whiteWoman)}
        >
          <Image source={whiteWoman} style={styles.circleImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Get the screen width dynamically
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5fbf3",
    // paddingTop: 10, // Adds space at the top of the screen (adjust as needed)
    // paddingHorizontal: 16, // Adds some padding on the left and right
  },
  profileContainer: {
    width: "100%", // 90% of the screen width
    height: width * 0.6, // Fixed height of 20 (you can adjust this if needed)
    paddingHorizontal: "5%", // To center the container horizontally, using 5% on both sides
    paddingVertical: "10%", // To center the container horizontally, using 5% on both sides
    backgroundColor: "#fff",
    marginBottom: 30,
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,

    display: "flex",
    flexDirection: "row",

    backgroundColor: "#4d5151",
  },
  doneButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,

    position: "absolute",
    left: 270,
  },
  boldText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 5,
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
    backgroundColor: "pink",
  },
  circleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image covers the whole circle
  },
  subtitleText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#6e7880",
  },
  titleText: {
    fontSize: 14,
    color: "#6e7880",
  },
  titlebText: {
    fontSize: 16,
    fontWeight: "bold",
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
    padding: "2%",
    backgroundColor: "#b5d8c2",
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
