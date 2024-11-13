import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

const CustomToggle = ({ isToggled, onToggle }) => {
  const position = useState(
    new Animated.Value(isToggled ? width * 0.45 : 0)
  )[0];

  // Update the slide animation based on the new state
  React.useEffect(() => {
    Animated.timing(position, {
      toValue: isToggled ? width * 0.45 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isToggled]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleContainer} onPress={onToggle}>
        {/* "Task" Text */}
        <Text style={[styles.toggleText, styles.taskText]}>Task</Text>

        {/* Animated Sliding Indicator */}
        <Animated.View
          style={[
            styles.toggleIndicator,
            {
              transform: [{ translateX: position }],
            },
          ]}
        />

        {/* "Done" Text */}
        <Text style={[styles.toggleText, styles.doneText]}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
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
  taskText: {
    left: 0,
  },
  doneText: {
    right: 0,
    color: "#000", // Green for the "Done" text
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

export default CustomToggle;
