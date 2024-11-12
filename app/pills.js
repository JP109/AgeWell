import CustomToggleSmall from "@/components/CustomToggleSmall";
import { ThemedText } from "@/components/ThemedText";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import oldHag from "../assets/images/oldHag.png";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PillsScreen() {
  const [selectedValue, setSelectedValue] = useState("1");
  const [amount, setAmount] = useState("1");
  const [duration, setDuration] = useState("weekly");
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [toggleState, setToggleState] = useState("schedule"); // "schedule" or "clock"
  const [time, setTime] = useState(new Date());

  // Handle the selected time
  const onTimeChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handlePickerOpen = () => {
    if (Platform.OS === "ios") setPickerVisible(true);
  };
  const handlePickerClose = () => setPickerVisible(false);

  const [activeButton, setActiveButton] = useState(1); // To track the active button

  const handleButtonPress = (buttonId) => {
    setActiveButton(buttonId); // Set the active button when clicked
  };

  const [activeButtons, setActiveButtons] = useState([]);

  const toggleButton = (buttonId) => {
    // Check if the button is already active
    if (activeButtons.includes(buttonId)) {
      // If active, deactivate it
      setActiveButtons(activeButtons.filter((id) => id !== buttonId));
    } else {
      // If inactive, activate it
      setActiveButtons([...activeButtons, buttonId]);
    }
  };

  const handleToggleChange = (newState) => {
    setToggleState(newState); // Update the toggle state to either "schedule" or "clock"
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.rightColumn}>
        <View style={styles.circle}>
          <Image source={oldHag} style={styles.circleImage} />
        </View>
      </View>
      <Text type="title" style={styles.titleText}>
        Add Plan
      </Text>
      <Text type="title" style={styles.titleText}>
        Pill Name
      </Text>
      <View>
        <View style={styles.pickerContainer}>
          <Image
            source={require("../assets/images/handPills.png")}
            style={styles.icon}
          />

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
            <Image
              source={require("../assets/images/pills.png")}
              style={styles.icon}
            />
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
            <Image
              source={require("../assets/images/calender.png")}
              style={styles.icon}
            />
            <Picker
              selectedValue={duration}
              style={styles.picker}
              onValueChange={(itemValue) => setDuration(itemValue)}
            >
              <Picker.Item label="Week" value="weekly" />
              <Picker.Item label="Today" value="today" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <CustomToggleSmall onChange={handleToggleChange} />
      </View>

      {/* Notifications Title */}
      <Text type="title" style={styles.titleText}>
        Notifications
      </Text>

      {toggleState != "clock" ? (
        <View style={styles.foodContainer}>
          <View style={styles.buttonRow}>
            {/* Button 1 */}
            <TouchableOpacity
              style={[styles.button, activeButton === 1 && styles.activeButton]}
              onPress={() => handleButtonPress(1)}
            >
              <Icon
                name="home"
                size={20}
                color={activeButton === 1 ? "#fff" : "#000"}
              />
            </TouchableOpacity>

            {/* Button 2 */}
            <TouchableOpacity
              style={[styles.button, activeButton === 2 && styles.activeButton]}
              onPress={() => handleButtonPress(2)}
            >
              <Icon
                name="search"
                size={20}
                color={activeButton === 2 ? "#fff" : "#000"}
              />
            </TouchableOpacity>

            {/* Button 3 */}
            <TouchableOpacity
              style={[styles.button, activeButton === 3 && styles.activeButton]}
              onPress={() => handleButtonPress(3)}
            >
              <Icon
                name="bell"
                size={20}
                color={activeButton === 3 ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <DateTimePicker
            value={time}
            mode="time"
            // display="default"
            onChange={onTimeChange}
            display="spinner" // Options: "spinner", "clock", "compact" (iOS-only)
          />
        </View>
      )}

      {/* Conditional rendering of weekContainer */}
      {duration === "weekly" && (
        <View style={styles.weekContainer}>
          <View style={styles.weekButtonRow}>
            {[...Array(7)].map((_, index) => {
              const buttonId = index + 1;
              const dayLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
              return (
                <View key={buttonId} style={styles.weekButtonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.weekButton,
                      activeButtons.includes(buttonId)
                        ? styles.weekActiveButton
                        : styles.weekInactiveButton,
                    ]}
                    onPress={() => toggleButton(buttonId)}
                  >
                    <Image
                      source={require("../assets/images/pills.png")}
                      style={styles.weeklyIcon}
                    />
                  </TouchableOpacity>
                  <Text style={styles.weekLabel}>{dayLabels[index]}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 25,
    color: "#333",
    fontWeight: "bold",
  },
  rightColumn: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
    maxHeight: height * 0.2,
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
  pickerWrapper: {
    marginTop: 20,
  },
  pickerContainer: {
    backgroundColor: "#f8f8f6",
    borderRadius: 30,
    width: width * 0.9,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  picker: {
    width: "100%",
    color: "#000",
  },
  pickerItem: {
    fontSize: 16,
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingBottom: 20,
    paddingTop: 10,
  },
  doneButton: {
    color: "#007AFF",
    fontSize: 18,
    textAlign: "right",
    padding: 10,
  },
  pickerContainer: {
    backgroundColor: "#f8f8f6", // Blue background for the picker container
    borderRadius: 30, // Rounded corners for the container
    width: width * 0.9, // 30% of the screen width
    height: 50,
    paddingLeft: 20,
  },
  pickerContainerSmall: {
    backgroundColor: "#f8f8f6", // Blue background for the picker container
    borderRadius: 30, // Rounded corners for the container
    // width: "100%", // 30% of the screen width
    height: 50,
    paddingLeft: 25,
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
  icon: {
    width: 20, // Adjust the width of the icon
    height: 20, // Adjust the height of the icon
    marginRight: 10, // Adds space between the icon and the picker
    position: "absolute",
    top: 15,
    left: 10,
  },
  toggleContainer: {
    marginTop: 40,
    marginBottom: 40,
    // display: "flex",
    // justifyContent: "flex-start",
  },
  foodContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 50,
  },
  buttonRow: {
    flexDirection: "row", // Arrange buttons in a row
    justifyContent: "space-between", // Spread buttons evenly
    width: width * 0.8, // Set a width to control the layout
  },
  button: {
    width: 70, // Width of the button (square)
    height: 70, // Height of the button (square)
    justifyContent: "center", // Center the icon
    alignItems: "center", // Center the icon
    backgroundColor: "#f8f8f6", // Light background for inactive buttons
    borderRadius: 10, // Optional: rounded corners
    margin: 5, // Add space between buttons
    shadowColor: "#000", // Color of the shadow
    shadowOffset: { width: 0, height: 4 }, // Offset of the shadow (horizontal, vertical)
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 6, // Radius of the shadow blur
    elevation: 5, // Android shadow effect
  },
  activeButton: {
    backgroundColor: "#55a377", // Blue background for the active button
    shadowColor: "#000", // Maintain shadow for active state
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5, // Stronger shadow when active
    shadowRadius: 8, // Slightly stronger blur on active button
    elevation: 7, // Slightly stronger shadow on Android when active
  },
  weekContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  weekButtonRow: {
    flexDirection: "row", // Arrange buttons in a row
    justifyContent: "space-between", // Spread buttons evenly
    width: width * 0.9, // Adjust width of the row
  },
  weekButtonContainer: {
    justifyContent: "center", // Center the button and label
    alignItems: "center", // Center the button and label
  },
  weekButton: {
    height: 35, // Height of the button
    width: 35, // Width of the button
    justifyContent: "center", // Center the icon
    alignItems: "center", // Center the icon
    borderRadius: 25, // Pill shape (half of width/height)
    padding: 15,
    margin: 5, // Space between buttons
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 6, // Shadow blur
    elevation: 5, // Android shadow
  },
  weekActiveButton: {
    backgroundColor: "#28a745", // Green when active
    shadowOpacity: 0.5, // Stronger shadow when active
    elevation: 7, // Stronger shadow on Android
  },
  weekInactiveButton: {
    backgroundColor: "#d3d3d3", // Grey when inactive
  },
  weeklyIcon: {
    width: 20, // Adjust the width of the icon
    height: 20, // Adjust the height of the icon
    marginRight: 10, // Adds space between the icon and the picker
    position: "absolute",
    top: 8,
    left: 5,
  },
  weekLabel: {
    fontSize: 14, // Font size for the day labels
    color: "#333", // Text color for the labels
    marginTop: 5, // Space between button and label
  },
});
