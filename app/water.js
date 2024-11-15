import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
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
// console.log("AAHN", ProgressIndicator); // Check what is being exported

// import ProgressCircle from "react-native-progress-circle"; // Correct import

// import LinearGradient from "react-native-linear-gradient";
// @ts-ignore

export default function WaterScreen() {
  const [selectedValue, setSelectedValue] = useState("4000");
  const [hydration, setHydration] = useState("1000");
  const [goal, setGoal] = useState("0");

  useEffect(() => {
    let goalNum = (Number(hydration) / Number(selectedValue)) * 100;
    setGoal(goalNum.toString());
  }, [selectedValue, hydration]);

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
    target: selectedValue, // The target value selected by the user
    date: date, // The current date in ISO format
  };
  // Prepare the data to be sent
  const intakeDataata = {
    intake: hydration, // The target value selected by the user
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
  const setWater = async (target) => {
    console.log("tr", target);
    setHydration(target);
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
                <Picker.Item label="0" value="0" />
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
          <View style={styles.waveContainer4}>
            <Image source={wave2} style={styles.waveImage4} />
          </View>
          <View style={styles.waveContainer5}>
            <Image source={wave3} style={styles.waveImage5} />
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
    top: 20,
    left: -50,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width,
    height: height * 0.3,

    // borderWidth: 7, // Optional: Add a border to the circle
    // borderColor: "red", // Blue border color
    transform: [{ rotate: "-20deg" }],
  },
  waveContainer5: {
    position: "absolute",
    right: -30,
    top: 10,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height * 0.3,
    // borderWidth: 7, // Optional: Add a border to the circle
    // borderColor: "pink", // Blue border color
    transform: [{ rotate: "25deg" }], // Rotate by 30 degrees
  },
  waveImage4: {
    width: "100%", // Cover the full width of the container
    height: "100%", // Cover the full height of the container
    resizeMode: "contain", // Ensure the image covers the container without distortion

    // borderWidth: 2, // Optional: Add a border to the circle
    // borderColor: "blue", // Optional: Circle border color

    position: "absolute",
    // bottom: -300,
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
});
