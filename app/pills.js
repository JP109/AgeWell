import { Dimensions, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { View } from "react-native";
// @ts-ignore
import { useState } from "react";
import { Picker } from "@react-native-picker/picker"; // Correct import
import CustomToggle from "@/components/CustomToggle";

export default function PillsScreen() {
  const [selectedValue, setSelectedValue] = useState("1");
  const [amount, setAmount] = useState("1");
  const [duration, setDuration] = useState("1");

  return (
    <View style={styles.mainContainer}>
      <View style={styles.rightColumn}>
        <View style={styles.circle}>
          {/* Replace with your image source */}
          {/* <Image source={{ uri: "https://example.com/your-image.jpg" }} style={styles.circleImage} /> */}
        </View>
      </View>
      <ThemedView style={styles.titleContainer} lightColor="#f5fbf3">
        <ThemedText type="title">Add Plan</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer} lightColor="#f5fbf3">
        <ThemedText type="title">Pill Name</ThemedText>
      </ThemedView>
      <View>
        <View style={styles.pickerContainer}>
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
      </View>
      {/* Row with two columns for Amount and Duration */}
      <View style={styles.rowContainer}>
        {/* Column 1: Amount */}
        <View style={styles.column}>
          <ThemedText type="subtitle">Amount</ThemedText>
          <View style={styles.pickerContainerSmall}>
            <Picker
              selectedValue={amount}
              style={styles.picker}
              onValueChange={(itemValue) => setAmount(itemValue)}
            >
              <Picker.Item label="10mg" value="1" />
              <Picker.Item label="20mg" value="2" />
              <Picker.Item label="30mg" value="3" />
            </Picker>
          </View>
        </View>

        {/* Column 2: Duration */}
        <View style={styles.column}>
          <ThemedText type="subtitle">Duration</ThemedText>
          <View style={styles.pickerContainerSmall}>
            <Picker
              selectedValue={duration}
              style={styles.picker}
              onValueChange={(itemValue) => setDuration(itemValue)}
            >
              <Picker.Item label="1 Day" value="1" />
              <Picker.Item label="3 Days" value="2" />
              <Picker.Item label="1 Week" value="3" />
            </Picker>
          </View>
        </View>
      </View>

      <CustomToggle />
    </View>
  );
}

// Get the screen width dynamically
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40, // Adds space at the top of the screen (adjust as needed)
    paddingHorizontal: 16, // Adds some padding on the left and right
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 25,
    backgroundColor: "#fff",
  },
  rightColumn: {
    justifyContent: "flex-end",
    alignItems: "flex-end", // Centers the circle vertically and horizontally
    flex: 1, // Adjust width of the circle container
    maxHeight: height * 0.2,

    // borderWidth: 2, // Optional: Add a border to the circle
    // borderColor: "#ccc", // Optional: Circle border color
  },
  circle: {
    width: 120, // Increased size of the circle (previously was 100)
    height: 120, // Increased size of the circle (previously was 100)
    borderRadius: 60, // Make it a perfect circle (half of the width/height)
    overflow: "hidden", // Ensures the image stays within the circle
    borderWidth: 2, // Optional: Add a border to the circle
    borderColor: "#ccc", // Optional: Circle border color
  },
  pickerContainer: {
    backgroundColor: "#f8f8f6", // Blue background for the picker container
    borderRadius: 30, // Rounded corners for the container
    width: width * 0.9, // 30% of the screen width
    height: 50,
  },
  pickerContainerSmall: {
    backgroundColor: "#f8f8f6", // Blue background for the picker container
    borderRadius: 30, // Rounded corners for the container
    // width: "100%", // 30% of the screen width
    height: 50,
  },
  picker: {
    width: "100%",
    // height: "100%",
    color: "#000", // Black text color for the items in the picker
    borderRadius: 25, // Rounded corners for the picker itself
    paddingVertical: 5, // Padding to make the text appear centered
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Space out the two columns
    marginTop: 25, // Add space above the row
  },
  column: {
    flex: 1, // Each column takes up 50% of the row
    marginHorizontal: 8, // Space between columns
  },
});
