import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Animated,
  Easing,
  Modal,
  Button,
  ImageBackground,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Picker } from "@react-native-picker/picker"; // Correct import
import water from "../assets/images/water.png";
import wave1 from "../assets/images/mesh.png";
import wave2 from "../assets/images/Vector2.png";
import wave3 from "../assets/images/Vector1.png";
import {
  ProgressCircle,
  CircularProgressWithChild,
} from "react-native-circular-progress-indicator";
import * as ProgressIndicator from "react-native-circular-progress-indicator";

// import ProgressCircle from "react-native-progress-circle"; // Correct import

// import LinearGradient from "react-native-linear-gradient";
// @ts-ignore

export default function WaterScreen() {
  const [selectedValue, setSelectedValue] = useState("4000");
  const [hydration, setHydration] = useState("1000");
  const [goal, setGoal] = useState("0");
  // const [newLevel, setNewLevel] = useState("0");
  const [userData, setUserData] = useState(Number(hydration));

  useEffect(() => {
    let goalNum = (Number(userData) / Number(selectedValue)) * 100;
    goalNum = goalNum.toFixed(0);
    setGoal(goalNum.toString());
  }, [selectedValue, hydration, userData]);

  const [currentTime, setCurrentTime] = useState(() => {
    const date = new Date();
    return date
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
  });
  const date = new Date().toISOString();

  // Prepare the data to be sent
  const data = {
    target: Number(selectedValue), // The target value selected by the user
    date: date, // The current date in ISO format
  };
  // Prepare the data to be sent
  const intakeDataata = {
    intake: Number(hydration), // The target value selected by the user
    date: date, // The current date in ISO format
  };

  const setTarget = async (target) => {
    console.log("TR", target, Number(target));
    setSelectedValue(target);
    try {
      // Make the POST request
      const response = await fetch(
        "https://agewell.onrender.com/api/water/add/target",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Send both the target and date in the body
        }
      );

      const result = await response.json(); // Parse the response

      if (response.ok) {
        // Handle success
        console.log("Response:", result);
        // You can handle successful response (e.g., show a success message)
      } else {
        // Handle failure (e.g., show error message)
        console.error("Error:", result);
        // Alert.alert("Error", result.message || "Failed to update target.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Alert.alert(
      //   "Error",
      //   "Unable to connect to the server. Please try again."
      // );
    }
  };
  const [showModal, setShowModal] = useState(false);
  const setWater = async (target) => {
    console.log("tr", target);
    // moveImage();
    setHydration(target);
    const newLevel = userData + Number(target);
    // setNewLevel(userData + Number(target));
    if (newLevel < selectedValue) {
      setUserData(newLevel);
    } else {
      setUserData(selectedValue);
      setShowModal(true);
      // Alert.alert(
      //   "Water target reached!",
      //   "Congratulations, you've reached your hydration goal!"
      // );
    }
    try {
      // Make the POST request
      const response = await fetch(
        "https://agewell.onrender.com/api/water/add/intake",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(intakeDataata), // Send both the target and date in the body
        }
      );

      const result = await response.json(); // Parse the response

      if (response.ok) {
        console.log("Response:", result);
      } else {
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setCurrentTime(
        date
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toUpperCase()
      );
    }, 1000); // Update every 1 second

    return () => clearInterval(intervalId);
  }, []);

  const handlePillSubmit = () => {
    console.log("HAndle submit");
    setUserData(0);
  };

  const animatedBottom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate whenever `userData` changes
    let increment = 22;
    switch (selectedValue) {
      case "5000":
        increment = 29;
        break;
      case "4500":
        increment = 27;
        break;
      case "4000":
        increment = 22;
        break;
      case "3500":
        increment = 18;
        break;
      case "3000":
        increment = 16;
        break;
      case "2500":
        increment = 13;
        break;
      case "2000":
        increment = 11;
        break;
      case "1500":
        increment = 9;
        break;
      case "1000":
        increment = 6;
        break;
      case "500":
        increment = 13;
        break;
      default:
        increment = 22; // Default value if not matched
    }
    Animated.timing(animatedBottom, {
      toValue: -(userData / increment),
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: false, // Must be false for layout properties like `bottom`
    }).start();
  }, [userData, selectedValue]);

  const animatedValue = useRef(new Animated.Value(0)).current;

  // Continuous up-and-down animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -10, // Move up by 10 pixels
          duration: 1000, // Duration of upward movement
          easing: Easing.inOut(Easing.linear), // Smooth linear easing
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0, // Move down by 10 pixels
          duration: 1000, // Duration of downward movement
          easing: Easing.inOut(Easing.linear), // Smooth linear easing
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const animatedValue2 = useRef(new Animated.Value(0)).current;

  // Continuous up-and-down animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(animatedValue2, {
          toValue: -10, // Move up by 10 pixels
          duration: 1000, // Duration of upward movement
          easing: Easing.inOut(Easing.linear), // Smooth linear easing
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue2, {
          toValue: 0, // Move down by 10 pixels
          duration: 1000, // Duration of downward movement
          easing: Easing.inOut(Easing.linear), // Smooth linear easing
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animatedValue2]);

  return (
    <View
      style={styles.mainContainer} // Apply the gradient to the main container
    >
      <View style={styles.waveContainer1}>
        <Image source={wave1} style={styles.waveImage} />
      </View>
      <View style={styles.waveContainer2}>
        <Image source={wave1} style={styles.waveImage} />
      </View>
      <View style={styles.waveContainer3}>
        <Image source={wave1} style={styles.waveImage} />
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={handlePillSubmit}>
        <Text style={styles.resetButtonText}>RESET</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        {/* <View style={styles.waveContainer4}> */}

        <Image source={wave2} style={styles.waveImage2} />
        <Image source={wave3} style={styles.waveImage3} />
        {/* </View> */}
        {/* Left column */}
        <View style={styles.leftColumn}>
          <View style={styles.row}>
            <Text style={styles.titleText}>{currentTime}</Text>
            <Text style={styles.subtitleText}>12th November</Text>

            {/* <TouchableOpacity style={styles.pillButton}>
              <Text style={styles.pillButtonText}>Record Hyrdation</Text>
            </TouchableOpacity> */}
            <View style={styles.pillButton}>
              <Text style={styles.targetLabel}>Record hydration</Text>
              <Picker
                selectedValue={hydration}
                style={styles.picker}
                onValueChange={(itemValue) => setWater(itemValue)}
              >
                <Picker.Item label="1 litre" value="1000" />
                <Picker.Item label="1.5 litre" value="1500" />
                <Picker.Item label="2 litre" value="2000" />
                <Picker.Item label="2.5 litre" value="2500" />
                <Picker.Item label="3 litre" value="3000" />
                <Picker.Item label="3.5 litre" value="3500" />
                <Picker.Item label="4 litre" value="4000" />
                <Picker.Item label="4.5 litre" value="4500" />
                <Picker.Item label="5 litre" value="5000" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Right column with circle image */}
        <View style={styles.rightColumn}>
          <View style={styles.circle}>
            {/* Replace with your image source */}
            {/* <Image source={{ uri: "https://example.com/your-image.jpg" }} style={styles.circleImage} /> */}
            <Image source={water} style={styles.circleImage} />
            <Image source={water} style={styles.circleImage2} />
          </View>
        </View>
      </View>

      <View style={styles.waterConsumed}>
        <View style={styles.largerCircle}>
          {userData != "0" ? (
            <Text style={styles.mainLabel}>{userData}ml</Text>
          ) : (
            <View></View>
          )}
          <View style={styles.waveContainer4}>
            <Animated.Image
              source={wave2}
              style={[
                styles.waveImage4,
                {
                  transform: [
                    { translateY: animatedValue }, // Continuous animation
                    { translateY: animatedBottom }, // UserData-driven animation
                  ],
                },
              ]}
            />
          </View>
          <View style={styles.waveContainer5}>
            <Animated.Image
              source={wave3}
              style={[
                styles.waveImage5,
                {
                  transform: [
                    { translateY: animatedValue2 }, // Continuous animation
                    { translateY: animatedBottom }, // UserData-driven animation
                  ],
                },
              ]}
            />
          </View>
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
            onValueChange={(itemValue) => setTarget(itemValue)}
          >
            <Picker.Item label="1 litre" value="1000" />
            <Picker.Item label="1.5 litre" value="1500" />
            <Picker.Item label="2 litre" value="2000" />
            <Picker.Item label="2.5 litre" value="2500" />
            <Picker.Item label="3 litre" value="3000" />
            <Picker.Item label="3.5 litre" value="3500" />
            <Picker.Item label="4 litre" value="4000" />
            <Picker.Item label="4.5 litre" value="4500" />
            <Picker.Item label="5 litre" value="5000" />
          </Picker>
        </View>
        <Text style={styles.progressText}>Goal Preview</Text>
        <View style={styles.progressContainer}>
          <CircularProgressWithChild
            value={goal} // Use 'value' prop instead of 'percent'
            radius={50}
            duration={1000} // Optional: Animation duration
            strokeWidth={8}
            rotation={0}
            lineCap="round"
            activeStrokeColor="#62cdfa"
            inActiveStrokeColor="#ddd"
            activeStrokeWidth={10}
            inActiveStrokeWidth={8}
            bgcolor="#fff"
          >
            <Text style={styles.percentText}>{`${goal}%`}</Text>
          </CircularProgressWithChild>
        </View>
      </View>
      {showModal && (
        <Modal transparent animationType="fade" visible={showModal}>
          <View style={styles.modalContainer}>
            {/* <ImageBackground
              style={styles.modalContent}
              source={require("../assets/images/water.png")}
              resizeMode="cover"
            > */}
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>🎉 Congratulations</Text>
              <Text style={styles.modalText}>You reached your goal!</Text>
              {/* <Button
                style={styles.modalButton}
                title="Close"
                onPress={() => setShowModal(false)}
              /> */}
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
            {/* </ImageBackground> */}
          </View>
        </Modal>
      )}
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
  backgroundImage: {
    zIndex: -1,
    width: width * 0.4,
  },
  resetButton: {
    position: "absolute",
    right: 30,
    top: 30,

    backgroundColor: "#f8f8f6",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  resetButtonText: {
    fontWeight: "400",
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
    position: "relative",
    overflow: "hidden",
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
    // borderWidth: 2, // Optional: Add a border to the circle
    // borderColor: "#ccc", // Optional: Circle border color
    position: "relative",

    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    overflow: "visible",
  },
  circleImage: {
    width: "500%",
    height: "200%",
    resizeMode: "cover", // Ensures the image covers the whole circle
    position: "absolute",
    bottom: -90,
    left: -250,
  },
  circleImage2: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image covers the whole circle
    position: "absolute",
    bottom: 30,
    left: 25,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 18,
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
    color: "#79838b",
    fontWeight: "bold",
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
  newView: {
    padding: 20,
    alignItems: "flex-end",
  },
  targetLabel: {
    fontSize: 13,
    color: "#fff",
    // fontWeight: "bold",
    // marginBottom: 10,
  },
  mainLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    position: "absolute",
    left: 50,
    top: 70,
  },
  pickerContainer: {
    backgroundColor: "#51bff2", // Blue background for the picker container
    borderRadius: 18, // Rounded corners for the container
    padding: 10, // Padding to create space inside the container
    width: width * 0.45, // 30% of the screen width
    height: 80,
  },
  picker: {
    width: "100%",
    color: "#fff", // White text color for the items in the picker
  },
  waveContainer1: {
    position: "absolute",
    top: 0,
    right: -100,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width * 0.93,
    height: height * 0.3,
  },
  waveContainer2: {
    position: "absolute",
    top: 200,
    left: -100,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width * 0.93,
    height: height * 0.3,
  },
  waveContainer3: {
    position: "absolute",
    right: -150,
    bottom: 10,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width,
    height: height * 0.4,
  },
  waveImage: {
    width: "100%", // Cover the full width of the container
    height: "100%", // Cover the full height of the container
    resizeMode: "contain", // Ensure the image covers the container without distortion
    borderRadius: 10, // Optional: Add rounded corners if needed
  },
  waveContainer4: {
    width: "100%", // 90% of the screen width
    height: width * 0.5, // Fixed height of 20 (you can adjust this if needed)
    borderWidth: 2, // Optional: Add a border to the circle
    borderColor: "red", // Optional: Circle border color

    position: "absolute",
    top: 0,
    zIndex: -1, // Place behind the main content
  },
  waveImage2: {
    width: "400%", // Cover the full width of the container
    height: "400%", // Cover the full height of the container
    resizeMode: "contain", // Ensure the image covers the container without distortion

    // borderWidth: 2, // Optional: Add a border to the circle
    // borderColor: "blue", // Optional: Circle border color

    position: "absolute",
    bottom: -300,
    left: -100,
  },
  waveImage3: {
    width: "400%", // Cover the full width of the container
    height: "400%", // Cover the full height of the container
    resizeMode: "contain", // Ensure the image covers the container without distortion

    // borderWidth: 2, // Optional: Add a border to the circle
    // borderColor: "blue", // Optional: Circle border color

    position: "absolute",
    bottom: -200,
    left: -100,
  },
  largerCircle: {
    width: 180, // Increased size of the circle (previously was 100)
    height: 180, // Increased size of the circle (previously was 100)
    borderRadius: 90, // Make it a perfect circle (half of the width/height)
    overflow: "hidden", // Ensures the image stays within the circle
    borderWidth: 7, // Optional: Add a border to the circle
    borderColor: "#ade5fc", // Blue border color
    backgroundColor: "#f3f9fb",
  },
  waveContainer4: {
    position: "absolute",
    top: 150,
    left: -190,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width * 1.9,
    height: height * 0.3,
    transform: [{ rotate: "-20deg" }],
  },
  waveContainer5: {
    position: "absolute",
    top: 140,
    left: -300,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",
    width: width * 1.9,
    height: height * 0.3,
    transform: [{ rotate: "25deg" }], // Rotate by 30 degrees
  },
  waveImage4: {
    width: "100%", // Cover the full width of the container
    height: "100%", // Cover the full height of the container
    resizeMode: "contain", // Ensure the image covers the container without distortion

    // borderWidth: 2, // Optional: Add a border to the circle
    // borderColor: "blue", // Optional: Circle border color

    position: "absolute",
    left: -30,
  },
  waveImage5: {
    width: "100%", // Cover the full width of the container
    height: "100%", // Cover the full height of the container
    resizeMode: "contain", // Ensure the image covers the container without distortion

    // borderWidth: 2, // Optional: Add a border to the circle
    // borderColor: "blue", // Optional: Circle border color

    position: "absolute",
    // bottom: -200,
    // left: -100,
  },
  percentText: {
    fontSize: 18,
    color: "#333", // Set text color for better contrast
    fontWeight: "bold", // Make the text bold
  },
  waterConsumed: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    maxHeight: height * 0.3,
  },
  percentText: {
    fontSize: 18,
    color: "#333", // Set text color for better contrast
    fontWeight: "bold", // Make the text bold
  },
  progressText: {
    position: "absolute",
    left: 10,
    bottom: 70,
    fontSize: 18,
    fontWeight: "bold",
  },
  progressContainer: {
    position: "absolute",
    left: 10,
    bottom: -40,
  },
  pillButton: {
    marginTop: 5, // Adds space between the subtitle and the button
    backgroundColor: "#fff", // Button background color
    paddingVertical: 10, // Adds vertical padding to make it more pill-like
    paddingHorizontal: 0, // Horizontal padding for shape control
    borderRadius: 25, // Makes the button pill-shaped
    alignItems: "center", // Centers the text inside the button
    justifyContent: "center",
    width: 120, // Explicitly set width to control the button's size
  },
  picker: {
    width: "100%",
    height: 50,
    color: "#000", // White text color for the items in the picker
  },
  targetLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
    // fontWeight: "bold",
    // marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#51bff2",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  modalButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  modalButtonText: {
    fontWeight: "bold",
  },
});
