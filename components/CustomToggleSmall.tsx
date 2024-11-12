import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons

const { width } = Dimensions.get("window");

const CustomToggleSmall = ({ onChange }) => {
  const [isTaskDone, setIsTaskDone] = useState(false);
  const [position] = useState(new Animated.Value(0)); // Position for sliding effect

  const toggleSwitch = () => {
    const newState = !isTaskDone;
    setIsTaskDone(newState);
    onChange(newState ? "clock" : "schedule"); // Notify parent to update the state

    Animated.timing(position, {
      toValue: newState ? width * 0.45 : 0, // Slide effect based on state
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleContainer} onPress={toggleSwitch}>
        <Text style={[styles.toggleText, styles.scheduleText]}>Schedule</Text>
        <Animated.View
          style={[
            styles.toggleIndicator,
            { transform: [{ translateX: position }] },
          ]}
        />
        <MaterialIcons name="access-time" size={24} style={styles.clockIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleContainer: {
    width: "80%", // Adjust width as needed
    height: width * 0.12, // Adjust height as needed
    backgroundColor: "#e0e0e0", // Light gray background
    borderRadius: width * 0.06, // Rounded corners (50% of height for circular look)
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8, // Space for the text inside
    position: "relative",
  },
  toggleText: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Default text color
    width: "50%",
    textAlign: "center",
  },
  scheduleText: {
    left: 0,
  },
  clockIcon: {
    position: "absolute",
    right: 15, // Slight adjustment to position the icon correctly
    color: "#4caf50",
  },
  toggleIndicator: {
    position: "absolute",
    width: "50%", // The width of the sliding indicator (half the width of the container)
    height: "100%",
    backgroundColor: "#4caf50", // Green indicator color
    borderRadius: width * 0.06, // Rounded corners for the indicator
    zIndex: -1, // Ensure the indicator is behind the text
  },
});

export default CustomToggleSmall;
