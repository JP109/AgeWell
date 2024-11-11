import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker"; // Correct import
// import ProgressCircle from "react-native-progress-circle"; // Correct import

// import LinearGradient from "react-native-linear-gradient";
// @ts-ignore

export default function WaterScreen() {
  const [selectedValue, setSelectedValue] = useState("1");
  return (
    <View
      style={styles.mainContainer} // Apply the gradient to the main container
    >
      <View style={styles.profileContainer}>
        {/* Left column */}
        <View style={styles.leftColumn}>
          <View style={styles.row}>
            <Text style={styles.titleText}>Title 1</Text>
            <Text style={styles.subtitleText}>Subtitle 1</Text>
            <TouchableOpacity style={styles.pillButton}>
              <Text style={styles.pillButtonText}>Record Hyrdation</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right column with circle image */}
        <View style={styles.rightColumn}>
          <View style={styles.circle}>
            {/* Replace with your image source */}
            {/* <Image source={{ uri: "https://example.com/your-image.jpg" }} style={styles.circleImage} /> */}
          </View>
        </View>
      </View>

      <View style={styles.waterConsumed}>
        <View style={styles.largerCircle}>
          {/* Replace with your image source */}
          {/* <Image source={{ uri: "https://example.com/your-image.jpg" }} style={styles.circleImage} /> */}
        </View>
      </View>

      <View style={styles.newView}>
        <View style={styles.pickerContainer}>
          <Text style={styles.targetLabel}>Target</Text>
          {/* Picker Dropdown */}
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>
        </View>

        {/* <ProgressCircle
          percent={selectedValue === "1" ? 30 : selectedValue === "2" ? 60 : 90}
          radius={50}
          borderWidth={8}
          color="#e74c3c"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text style={{ fontSize: 18 }}>
            {selectedValue === "1"
              ? "30%"
              : selectedValue === "2"
              ? "60%"
              : "90%"}
          </Text>
        </ProgressCircle> */}
      </View>
    </View>
  );
}

// Get the screen width dynamically
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f3f9fb",
    paddingTop: 40, // Adds space at the top of the screen (adjust as needed)
    paddingHorizontal: 16, // Adds some padding on the left and right
  },
  profileContainer: {
    width: "90%", // 90% of the screen width
    height: width * 0.5, // Fixed height of 20 (you can adjust this if needed)
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
    flex: 2, // Takes up the remaining space
    justifyContent: "space-between", // Distribute space between rows
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
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 14,
    color: "#6e7880",
  },
  pillButton: {
    marginTop: 10, // Adds space between the subtitle and the button
    backgroundColor: "#fff", // Button background color
    paddingVertical: 10, // Adds vertical padding to make it more pill-like
    paddingHorizontal: 20, // Horizontal padding for shape control
    borderRadius: 25, // Makes the button pill-shaped
    alignItems: "center", // Centers the text inside the button
    justifyContent: "center",
    width: 150, // Explicitly set width to control the button's size
  },
  pillButtonText: {
    color: "#000", // White text color for contrast
    fontSize: 13, // Font size for the text
  },
  waterConsumed: {
    justifyContent: "center",
    alignItems: "center", // Centers the circle vertically and horizontally
    flex: 1, // Adjust width of the circle container
    maxHeight: height * 0.3,

    // borderWidth: 2, // Black 2px border
    // borderColor: "red", // Set the border color to black
    // borderRadius: 10, // Border radius for rounded corners (adjust as needed)
  },
  largerCircle: {
    width: 160, // Increased size of the circle (previously was 100)
    height: 160, // Increased size of the circle (previously was 100)
    borderRadius: 80, // Make it a perfect circle (half of the width/height)
    overflow: "hidden", // Ensures the image stays within the circle
    borderWidth: 2, // Optional: Add a border to the circle
    borderColor: "#ccc", // Optional: Circle border color
  },
  newView: {
    // backgroundColor: "#fff",
    padding: 20,
    // borderRadius: 15,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 6,
    // elevation: 5,
    // marginBottom: 20,
    alignItems: "flex-end",
  },
  targetLabel: {
    fontSize: 13,
    color: "#fff",
    // fontWeight: "bold",
    // marginBottom: 10,
  },
  // picker: {
  //   width: width * 0.3, // 30% of screen width
  //   backgroundColor: "#51bff2", // Blue background for the picker
  //   color: "#fff", // White text color
  //   borderRadius: 20, // Rounded corners
  // },
  pickerContainer: {
    backgroundColor: "#51bff2", // Blue background for the picker container
    borderRadius: 8, // Rounded corners for the container
    padding: 10, // Padding to create space inside the container
    width: width * 0.4, // 30% of the screen width
    height: 70,
  },
  picker: {
    width: "100%",
    color: "#fff", // White text color for the items in the picker
  },
});
