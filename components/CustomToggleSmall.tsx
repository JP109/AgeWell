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
  const [position] = useState(new Animated.Value(5)); // Initial position for the sliding indicator

  const toggleSwitch = () => {
    const newState = !isTaskDone;
    setIsTaskDone(newState);
    onChange(newState ? "clock" : "schedule"); // Notify parent to update the state

    Animated.timing(position, {
      toValue: newState ? 0 : 5, // Slide to the right when toggled on, left when toggled off
      duration: 300, // Animation duration
      useNativeDriver: true, // Enable native driver for better performance
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleContainer} onPress={toggleSwitch}>
        <Text
          style={[
            styles.toggleText,
            styles.scheduleText,
            !isTaskDone ? { color: "#55A377" } : { color: "#fff" },
          ]}
        >
          Schedule
        </Text>
        <Animated.View
          style={[
            isTaskDone
              ? styles.toggleIndicatorSchedule
              : styles.toggleIndicator,
            { transform: [{ translateX: position }] },
          ]}
        />
        <MaterialIcons
          name="access-time"
          size={24}
          style={[styles.clockIcon, isTaskDone && { color: "#000" }]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 150,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 144,
    zIndex: -91,
  },
  toggleContainer: {
    width: "100%", // Adjust width as needed
    height: width * 0.12, // Adjust height as needed
    backgroundColor: "#f8f8f6", // Light gray background
    borderRadius: width * 0.06, // Rounded corners (50% of height for circular look)
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5, // Space for the text inside
    position: "relative",
  },
  toggleText: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "bold",
    color: "#333", // Default text color
    textAlign: "center",
    marginLeft: 20,
  },
  scheduleText: {
    left: 0,
  },
  clockIcon: {
    position: "absolute",
    right: 17, // Slight adjustment to position the icon correctly
    color: "#fff",
  },
  toggleIndicator: {
    position: "absolute",
    width: 35, // The width of the sliding indicator (half the width of the container)
    height: 35,
    backgroundColor: "#55A377", // Green indicator color
    borderRadius: width * 0.06, // Rounded corners for the indicator
    zIndex: -1, // Ensure the indicator is behind the text
    left: 92,
  },
  toggleIndicatorSchedule: {
    position: "absolute",
    width: 86, // The width of the sliding indicator (half the width of the container)
    height: 35,
    backgroundColor: "#55A377", // Green indicator color
    borderRadius: width * 0.06, // Rounded corners for the indicator
    zIndex: -1, // Ensure the indicator is behind the text
    left: 8,
  },
});

export default CustomToggleSmall;
