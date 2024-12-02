import { Image, Text, TouchableOpacity } from "react-native";

import { View } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import edit from "../assets/images/edit-line.png";
import settings from "../assets/images/settings.png";
import { useAvatar } from "./AvatarContext";

import { Dimensions, StyleSheet } from "react-native";

// import LinearGradient from "react-native-linear-gradient";
import darkGuy from "../assets/images/darkguy.png";
import darkWoman from "../assets/images/darkwoman.png";
import oldMan from "../assets/images/oldman.png";
import punjabi from "../assets/images/punjabi.png";
import whiteGuy from "../assets/images/whiteguy.png";
import whiteWoman from "../assets/images/whitewoman.png";
import back from "../assets/images/back.png";
// @ts-ignore

export default function ProfileScreen() {
  const [screen, setScreen] = useState("profile");

  const router = useRouter();
  const [userData, setUserData] = useState();
  const { currentAvatar, setCurrentAvatar } = useAvatar();

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
  const handleImageChange = (image) => {
    setCurrentAvatar(image); // Update the avatar based on the clicked image
  };
  return screen === "profile" ? (
    // Main component's content
    <LinearGradient
      colors={["#cdf7c0", "#b6e7f5"]} // Start color and end color for the gradient
      style={styles.mainContainer} // Apply the gradient to the main container
    >
      <View style={styles.profileContainer}>
        {/* Left column */}
        <View style={styles.leftColumn}>
          <View style={styles.row}>
            <Text style={styles.titleText}>Name</Text>
            <Text style={styles.titlebText}>{userData?.profile.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>Joined</Text>
            <Text style={styles.titlebText}>Nov 2024</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>Emergency Contact</Text>
            <Text style={styles.titlebText}>Abhishek</Text>
          </View>
        </View>

        {/* Right column with circle image */}
        <View style={styles.rightColumn}>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <View style={styles.settingsButton}>
              <Image source={settings} style={styles.editButtonImg} />
            </View>
          </TouchableOpacity>
          <View style={styles.circle}>
            <Image source={currentAvatar} style={styles.circleImage} />
          </View>
          <TouchableOpacity onPress={() => setScreen("avatar")}>
            <View style={styles.editButton}>
              <Image source={edit} style={styles.editButtonImg} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.vitalsGrid}>
        <TouchableOpacity
          style={styles.vitalsContainer}
          onPress={() => router.push("/schedules")}
        >
          {/* <View> */}
          <Text style={styles.subtitleText}>{userData?.pillCount}</Text>
          <Text style={styles.titleText}>No. of schedules</Text>
          {/* </View> */}
        </TouchableOpacity>
        <View style={styles.vitalsContainer}>
          <Text style={styles.subtitleText}>{userData?.taskCount}</Text>
          <Text style={styles.titleText}>No. of tasks</Text>
        </View>
      </View>
      <View style={styles.vitalsGrid}>
        <View style={styles.vitalsContainer}>
          <Text style={styles.subtitleText}>{userData?.waterIntake}</Text>
          <Text style={styles.titleText}>Water Intake</Text>
        </View>
        <View style={styles.vitalsContainer}>
          <Text style={styles.subtitleText}>{userData?.waterTarget}</Text>
          <Text style={styles.titleText}>Water Target</Text>
        </View>
      </View>
    </LinearGradient>
  ) : screen === "avatar" ? (
    <View
      style={styles.mainContainerAvatar} // Apply the gradient to the main container
    >
      <View style={styles.profileContainerAvatar}>
        <TouchableOpacity onPress={() => setScreen("profile")}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setScreen("profile")}
        >
          <Image source={back} style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.rightColumnAvatar}>
          <View style={styles.circle}>
            <Image source={currentAvatar} style={styles.circleImage} />
          </View>
          <Text style={styles.boldText}>Current Avatar</Text>
        </View>
      </View>

      <View style={styles.vitalsGrid}>
        <TouchableOpacity
          style={styles.vitalsContainerAvatar}
          onPress={() => handleImageChange(darkGuy)}
        >
          <Image source={darkGuy} style={styles.circleImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vitalsContainerAvatar}
          onPress={() => handleImageChange(darkWoman)}
        >
          <Image source={darkWoman} style={styles.circleImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.vitalsGrid}>
        <TouchableOpacity
          style={styles.vitalsContainerAvatar}
          onPress={() => handleImageChange(punjabi)}
        >
          <Image source={punjabi} style={styles.circleImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vitalsContainerAvatar}
          onPress={() => handleImageChange(oldMan)}
        >
          <Image source={oldMan} style={styles.circleImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.vitalsGrid}>
        <TouchableOpacity
          style={styles.vitalsContainerAvatar}
          onPress={() => handleImageChange(whiteGuy)}
        >
          <Image source={whiteGuy} style={styles.circleImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vitalsContainerAvatar}
          onPress={() => handleImageChange(whiteWoman)}
        >
          <Image source={whiteWoman} style={styles.circleImage} />
        </TouchableOpacity>
      </View>
    </View>
  ) : null; // Handle other cases if necessary
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
    marginBottom: 30,

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
  editButton: {
    position: "absolute",
    top: -20,
    right: -70,
    height: 25,
    width: 25,
    // overflow: "hidden",
  },
  settingsButton: {
    position: "absolute",
    top: -30,
    right: -70,
    height: 20,
    width: 20,
  },
  editButtonImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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

  // avatar styles
  mainContainerAvatar: {
    flex: 1,
    backgroundColor: "#f5fbf3",
    // paddingTop: 10,
    // paddingTop: 10, // Adds space at the top of the screen (adjust as needed)
    // paddingHorizontal: 16, // Adds some padding on the left and right
  },
  profileContainerAvatar: {
    width: "100%", // 90% of the screen width
    height: width * 0.6, // Fixed height of 20 (you can adjust this if needed)
    paddingHorizontal: "5%", // To center the container horizontally, using 5% on both sides
    // paddingVertical: "10%", // To center the container horizontally, using 5% on both sides
    backgroundColor: "#fff",
    // marginBottom: 30,
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
    top: 30,
  },
  iconContainer: {
    width: 40,
    height: 40,
    position: "absolute",
    left: 30,
    top: 30,
  },
  backButton: {
    maxHeight: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
  },
  boldText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 5,
  },
  // rowAvatar: {
  //   flexDirection: "column", // Makes each row have two subrows
  //   justifyContent: "space-between", // Ensure the title and subtitle are spaced out
  //   marginBottom: 10, // Adds space between rows
  // },
  rightColumnAvatar: {
    justifyContent: "center",
    alignItems: "center", // Centers the circle vertically and horizontally
    flex: 1, // Adjust width of the circle container
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
  vitalsContainerAvatar: {
    width: "35%",
    height: width * 0.35,
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
    overflow: "hidden",
  },
  circleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
