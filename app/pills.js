import CustomToggleSmall from "@/components/CustomToggleSmall";
import { ThemedText } from "@/components/ThemedText";
import { TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import bell from "../assets/images/bellIcon.png";
import { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import oldWoman from "../assets/images/oldWoman.png";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TimerPickerModal } from "react-native-timer-picker";

export default function PillsScreen() {
  const [selectedValue, setSelectedValue] = useState("1");
  const [amount, setAmount] = useState("1");
  const [duration, setDuration] = useState("weekly");
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [toggleState, setToggleState] = useState("schedule"); // "schedule" or "clock"
  // const [time, setTime] = useState(new Date());
  // const [inputValue, setInputValue] = useState(""); // For storing the input field value

  const handleOnlyPillSubmit = async () => {
    // Check if the input value is not empty
    if (searchText.trim() === "") {
      alert("Please enter a medicine name.");
      return;
    }

    // Prepare the data to send in the POST request
    const payload = {
      name: searchText, // The name entered by the user
      dosage: "500mg", // Hardcoded dosage
      schedule: duration, // Hardcoded schedule (weekly in this case)
      amount: parseInt(amount, 10), // Hardcoded amount (defaulted to 1)
      time: time,
    };

    try {
      const response = await fetch(
        "https://agewell.onrender.com/api/pills/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Medicine added successfully:", result);
        alert("Medicine added successfully!");
      } else {
        console.error("Error adding medicine:", response.status);
        alert("Failed to add medicine.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred while adding the medicine.");
    }
  };
  const handlePillSubmit = async () => {
    // Check if the input value is not empty
    if (searchText.trim() === "") {
      alert("Please enter a medicine name.");
      return;
    }

    // Prepare the data to send in the POST request
    const payload = {
      name: searchText, // The name entered by the user
      dosage: "500mg",
      schedule: duration,
      amount: parseInt(amount, 10),
      time: alarmString, // Hardcoded time
    };

    console.log("GGGGGGGGGGGGGGG", payload);

    try {
      console.log("GGGGGGGGGGGGGGG", payload);
      const response = await fetch(
        "https://agewell.onrender.com/api/pills/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Medicine added successfully:", result);
        alert("Medicine added successfully!");
      } else {
        console.error("Error adding medicine:", response.status, response);
        alert("Failed to add medicine.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred while adding the medicine.");
    }
  };

  // State to hold the medicine data
  const [medicines, setMedicines] = useState([]);

  // Fetch the medicine data from the API
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("https://agewell.onrender.com/api/pills/");
        const data = await response.json();
        console.log("medicine", data);
        const names = data.map((item) => item.name);
        setMedicines(names); // Assuming the response is an array of medicines
        console.log("medicine NEW!!!!!!!!!!!", names);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, [searchText]); // Empty dependency array means this effect runs only once on mount

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

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [searchText, setSearchText] = useState("");

  const dropdownValues = [
    "Apple",
    "Banana",
    "Cherry",
    "Grapes",
    "Orange",
    "Pineapple",
    "Strawberry",
    "Watermelon",
  ];

  const [time, setTime] = useState("00:00");

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const filteredValues = dropdownValues.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchText(item); // Set the selected item as search text
    setDropdownVisible(false); // Close the dropdown after selection
  };

  // Function to handle click outside dropdown (close it)
  const handleCloseDropdown = () => {
    setDropdownVisible(false); // Close the dropdown
    Keyboard.dismiss(); // Dismiss keyboard if it's open
  };

  const [alarmString, setAlarmString] = useState("10:00");
  const [showPicker, setShowPicker] = useState(false);

  // Format the time into a readable string
  // const formatTime = (duration) => {
  //   console.log("@@@@@@@@@@@@@@@@@@@@@@", duration);
  //   const hours = Math.floor(duration / 60);
  //   const minutes = duration % 60;
  //   let returnVal = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  //   console.log("PPPPPPPPPPPPPPP", returnVal);
  //   return returnVal;
  // };
  function formatTime(timeObj) {
    const hours = String(timeObj.hours).padStart(2, "0");
    const minutes = String(timeObj.minutes).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <TouchableWithoutFeedback onPress={handleCloseDropdown}>
      <View style={styles.mainContainer}>
        {!isDropdownVisible && (
          <View>
            <View style={styles.doneContainer}>
              <View style={styles.doneButtonTop}>
                <TouchableOpacity onPress={handlePillSubmit}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <View style={styles.circle}>
                <Image source={oldWoman} style={styles.circleImage} />
              </View>
            </View>
          </View>
        )}

        <Text type="title" style={styles.subtitle}>
          Pill Name
        </Text>
        <View style={styles.pillNameContainer}>
          <View style={styles.ddContainer}>
            <Image
              source={require("../assets/images/handPills.png")}
              style={styles.iconPills}
            />
            <TextInput
              style={styles.ddInput}
              placeholder="Enter Medicine Name"
              value={searchText}
              onFocus={() => setDropdownVisible(true)} // Show dropdown when focused
              onChangeText={setSearchText} // Update search text as user types
            />
            {isDropdownVisible && (
              <FlatList
                data={medicines}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectItem(item)}>
                    <Text style={styles.ddDropdownItem}>{item}</Text>
                  </TouchableOpacity>
                )}
                style={styles.ddDropdown}
              />
            )}
          </View>
          <View style={styles.addButtonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleOnlyPillSubmit}
            >
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View></View>

        {/* Row with two columns for Amount and Duration */}
        <View style={styles.rowContainer}>
          {/* Column 1: Amount */}
          <View style={styles.column}>
            <Text style={styles.subtitle}>Amount</Text>
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
                <Picker.Item label="40mg" value="4" />
                <Picker.Item label="50mg" value="5" />
              </Picker>
            </View>
          </View>

          {/* Column 2: Duration */}
          <View style={styles.column}>
            <Text style={styles.subtitle}>Duration</Text>
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
                <Picker.Item label="Today" value="daily" />
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.toggleContainer}>
          <CustomToggleSmall onChange={handleToggleChange} />
        </View>

        {/* Notifications Title */}
        <Text type="title" style={styles.subtitle}>
          Notifications
        </Text>

        {toggleState == "clock" ? (
          <View style={styles.foodContainer}>
            <View style={[styles.buttonRow]}>
              {/* Button 1 */}
              <TouchableOpacity
                style={[
                  styles.button,
                  ,
                  styles.meals,
                  activeButton === 1 && styles.activeButton,
                ]}
                onPress={() => handleButtonPress(1)}
              >
                <Image
                  source={require("../assets/images/breakfast.png")}
                  style={[
                    styles.mealIcons,
                    activeButton === 1 && styles.mealIconActive,
                  ]}
                />
                <Text
                  style={[
                    styles.mealText,
                    activeButton === 1 && styles.mealIconActive,
                  ]}
                >
                  Breakfast
                </Text>
              </TouchableOpacity>

              {/* Button 2 */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.meals,
                  activeButton === 2 && styles.activeButton,
                ]}
                onPress={() => handleButtonPress(2)}
              >
                <Image
                  source={require("../assets/images/lunch.png")}
                  style={[
                    styles.mealIcons,
                    activeButton === 2 && styles.mealIconActive,
                  ]}
                />
                <Text
                  style={[
                    styles.mealText,
                    activeButton === 2 && styles.mealIconActive,
                  ]}
                >
                  Lunch
                </Text>
              </TouchableOpacity>

              {/* Button 3 */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.meals,
                  activeButton === 3 && styles.activeButton,
                ]}
                onPress={() => handleButtonPress(3)}
              >
                <Image
                  source={require("../assets/images/dinner.png")}
                  style={[
                    styles.mealIcons,
                    activeButton === 3 && styles.mealIconActive,
                  ]}
                />
                <Text
                  style={[
                    styles.mealText,
                    activeButton === 3 && styles.mealIconActive,
                  ]}
                >
                  Dinner
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPicker(true)}
              style={styles.setButton}
            >
              {alarmString && (
                <Text style={styles.alarmTime}>{alarmString}</Text>
              )}

              <View style={styles.setButtonText}>
                <Image source={bell} style={styles.bellIcon} />
              </View>
            </TouchableOpacity>

            {/* Timer Picker Modal */}
            <TimerPickerModal
              visible={showPicker}
              setIsVisible={setShowPicker}
              onConfirm={(pickedDuration) => {
                setAlarmString(formatTime(pickedDuration));
                setShowPicker(false);
              }}
              modalTitle=""
              onCancel={() => setShowPicker(false)}
              closeOnOverlayPress
              styles={{ theme: "dark" }}
              modalProps={{
                overlayOpacity: 0.2,
              }}
            />
          </View>
        )}
        {/* {isPickerVisible && (
          // <DateTimePicker
          //   value={time}
          //   mode="time"
          //   display="spinner" // Options: "spinner", "clock", "compact" (iOS-only)
          //   onChange={onTimeChange}
          // />
          <TimerPicker onChange={onTimeChange} />
        )} */}

        {/* Conditional rendering of weekContainer */}
        {duration === "weekly" && (
          <View style={styles.weekContainer}>
            <View style={styles.weekButtonRow}>
              {[...Array(7)].map((_, index) => {
                const buttonId = index + 1;
                const dayLabels = [
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun",
                ];
                return (
                  <View key={buttonId} style={styles.weekButtonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.weekButton, // No background or border-radius here
                        activeButtons.includes(buttonId)
                          ? styles.weekActiveButton
                          : styles.weekInactiveButton,
                      ]}
                      onPress={() => toggleButton(buttonId)}
                    >
                      <Image
                        source={require("../assets/images/pills.png")}
                        style={[
                          styles.weeklyIcon,
                          activeButtons.includes(buttonId)
                            ? styles.weeklyActiveIcon
                            : "",
                        ]}
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
    </TouchableWithoutFeedback>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  statusText: {
    fontSize: 18,
    color: "#F1F1F1",
  },
  alarmTime: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    // marginVertical: 10,
  },
  setButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 28,
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: "#C2C2C2",
    backgroundColor: "#f8f8f6",
    maxWidth: 130,
    display: "flex",
    flexDirection: "row-reverse",
  },
  setButtonText: {
    width: 30,
    height: 30,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
    // zIndex: -1,
  },
  ddContainer: {
    position: "relative", // Ensures the dropdown is positioned relative to this container
    paddingBottom: 20,
    backgroundColor: "#fff",
    width: "80%",
    alignSelf: "center",

    // borderWidth: 2, // Black 2px border
    // borderColor: "red", // Set the border color to black
    // borderRadius: 10, // Border radius for rounded corners (adjust as needed)
  },
  ddInput: {
    backgroundColor: "#f8f8f6",
    borderRadius: 30,
    width: "100%",
    height: 50,
    justifyContent: "center",
    paddingLeft: 45,
  },
  ddDropdown: {
    position: "absolute", // Position dropdown absolutely within the ddContainer
    top: 40, // Adjust to show the dropdown below the input field
    left: 1,
    right: 0,
    borderWidth: 1,
    // borderRadius: 18,
    borderColor: "transparent",
    maxHeight: 400,
    backgroundColor: "#f8f8f6",
    zIndex: 9999, // High z-index to ensure it appears above other components
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  ddDropdownItem: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f8f8f6",
    // borderRadius: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    zIndex: -1,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    flex: 1,
    zIndex: -1,
  },
  submitButton: {
    backgroundColor: "#62cdfa",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginLeft: 10,
    zIndex: -1,
  },
  doneButtonText: {
    color: "#4caf50",
    fontSize: 18, // Increased size for the "+" symbol
    fontWeight: "bold",
    zIndex: -1,
  },
  doneContainer: {
    // borderWidth: 2, // Black 2px border
    // borderColor: "red", // Set the border color to black
    // borderRadius: 10, // Border radius for rounded corners (adjust as needed)

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  doneButtonTop: {
    backgroundColor: "#f8f8f6",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginLeft: 10,
    maxWidth: 70,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    position: "relative",

    // position: "absolute",
    // right: 30,
    // top: 20,
    // zIndex: -1,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 24, // Increased size for the "+" symbol
    fontWeight: "bold",
    zIndex: -1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
    zIndex: -1,
  },
  titleText: {
    fontSize: 25,
    color: "#333",
    fontWeight: "bold",
    zIndex: -1,
  },
  rightColumn: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
    maxHeight: height * 0.15,

    marginTop: 120,
    marginRight: 20,
    zIndex: -1,
  },
  circle: {
    width: 115,
    height: 100,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: -1,
  },
  circleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: -1,
  },
  pickerWrapper: {
    marginTop: 20,
    zIndex: -1,
  },
  pickerContainer: {
    backgroundColor: "#f8f8f6",
    borderRadius: 30,
    width: width * 0.9,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
    zIndex: -1,
  },
  picker: {
    width: "100%",
    color: "#000",
    zIndex: -1,
  },
  pickerItem: {
    fontSize: 16,
    color: "#000",
    zIndex: -1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: -1,
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingBottom: 20,
    paddingTop: 10,
    zIndex: -1,
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
    marginTop: 0, // Add space above the row
    zIndex: -1,
  },
  column: {
    flex: 1, // Each column takes up 50% of the row
    marginHorizontal: 8, // Space between columns
  },
  icon: {
    width: 20, // Adjust the width of the icon
    height: 20, // Adjust the height of the icon
    marginRight: 10, // Adds space between the icon and the picker
    zIndex: 20,
    position: "absolute",
    top: 15,
    left: 10,
  },
  iconPills: {
    width: 20, // Adjust the width of the icon
    height: 20, // Adjust the height of the icon
    marginRight: 10, // Adds space between the icon and the picker
    zIndex: 20,
    position: "absolute",
    top: 15,
    left: 20,
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
    left: -20,
    // paddingTop: 50,
  },
  buttonRow: {
    flexDirection: "row", // Arrange buttons in a row
    justifyContent: "space-between", // Spread buttons evenly
    width: width * 0.8, // Set a width to control the layout
    zIndex: -1,
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
    paddingTop: 0,
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
    // shadowColor: "#000", // Shadow color
    // shadowOffset: { width: 0, height: 4 }, // Shadow offset
    // shadowOpacity: 0.3, // Shadow opacity
    // shadowRadius: 6, // Shadow blur
    // elevation: 5, // Android shadow
    // backgroundColor: "transparent",
    // tintColor: "transparent",

    // borderWidth: 2, // Black 2px border
    // borderColor: "red", // Set the border color to black
    // borderRadius: 10, // Border radius for rounded corners (adjust as needed)
  },
  weekActiveButton: {
    // backgroundColor: "#28a745", // Green when active
    // shadowOpacity: 0.5, // Stronger shadow when active
    // elevation: 7, // Stronger shadow on Android
  },
  weekInactiveButton: {
    // backgroundColor: "transparent", // Grey when inactive
  },
  weeklyIcon: {
    width: 20, // Adjust the width of the icon
    height: 20, // Adjust the height of the icon
    marginRight: 10, // Adds space between the icon and the picker
    position: "absolute",
    top: 8,
    left: 5,
    backgroundColor: "transparent",

    // borderWidth: 2, // Black 2px border
    // borderColor: "pink", // Set the border color to black
    // borderRadius: 10, // Border radius for rounded corners (adjust as needed)
  },
  weeklyActiveIcon: {
    tintColor: "#4CAF50",
  },
  weekLabel: {
    fontSize: 14, // Font size for the day labels
    color: "#333", // Text color for the labels
    marginTop: 5, // Space between button and label
  },
  addButtonContainer: {
    // position: "absolute",
    // bottom: 20,
    top: -10,
    left: 30,
    transform: [{ translateX: -10 }],
    alignItems: "center",
    justifyContent: "center",

    // borderWidth: 2, // Black 2px border
    // borderColor: "green", // Set the border color to black
    // borderRadius: 10, // Border radius for rounded corners (adjust as needed)
    width: 20,
  },
  addButton: {
    backgroundColor: "#4caf50",
    borderRadius: 40,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  pillNameContainer: {
    display: "flex",

    // borderWidth: 2, // Black 2px border
    // borderColor: "pink", // Set the border color to black
    // borderRadius: 10, // Border radius for rounded corners (adjust as needed)

    flexDirection: "row",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    zIndex: -1,
    marginBottom: 10,
  },
  bellIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image covers the whole circle
  },
  meals: {
    borderRadius: 12,
    backgroundColor: "#F8F8F6",
    width: 87,
    minWidth: 87,
    paddingTop: 24,
    paddingRight: 14,
    paddingBottom: 10,
    paddingLeft: 14,
    height: 90,
    marginRight: 22,
    flex: 1,
    flexShrink: 0, // Prevent shrinking
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  mealIcons: {
    width: 24, // Adjust the width of the icon
    height: 24, // Adjust the height of the icon
    top: -1,
    tintColor: "#000",
    color: "#000",
  },

  mealIconActive: {
    tintColor: "#fff",
    color: "#fff",
  },

  mealText: {
    // width: 62,
    marginTop: 6,
  },
});
