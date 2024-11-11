import { Dimensions, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import CustomToggle from "@/components/CustomToggle";
import TaskWithCheckbox from "@/components/TaskCheckbox";
import { TouchableOpacity, View } from "react-native";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useState, useMemo } from "react";

export default function LandingScreen() {
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    time: "",
    taskFinished: false,
    notifications: false,
  });
  const [showCompleted, setShowCompleted] = useState(false); // Track toggle state

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://agewell.onrender.com/api/tasks/");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Memoize filtered tasks based on toggle state
  const filteredTasks = useMemo(() => {
    console.log("aaaa");

    return tasks.filter((task) =>
      showCompleted ? task.taskFinished : !task.taskFinished
    );
  }, [tasks, showCompleted]);

  // Function to send a POST request
  const sendTaskRequest = async (text) => {
    try {
      const response = await fetch("http://localhost:4000/api/tasks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: text }), // Send task text in request body as JSON
      });
      if (!response.ok) {
        console.error("Error:", response.statusText);
      }
      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ThemedView style={styles.titleContainer} lightColor="#f5fbf3">
        <ThemedText type="title">Daily Log</ThemedText>
        <Icon name="clock-o" size={20} color="#000" />
      </ThemedView>

      {/* Toggle between "Task" and "Done" */}
      <View>
        <CustomToggle
          toggleText1="Task"
          toggleText2="Done"
          isToggled={showCompleted}
          onToggle={() => setShowCompleted((prev) => !prev)}
        />
      </View>

      {/* Display filtered tasks */}
      <View style={styles.tasksContainer}>
        {filteredTasks.map((task) => (
          <TaskWithCheckbox
            key={task._id}
            taskText={task.name}
            isChecked={task.taskFinished}
          />
        ))}
      </View>

      <TextInput
        style={styles.inputBox}
        placeholder="Enter your task..."
        placeholderTextColor="#6e7880" // Grey text for placeholder
        value={taskDetails.name}
        onChangeText={(text) => setTaskDetails({ ...taskDetails, name: text })}
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Get the screen width dynamically
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5fbf3",
    paddingTop: 40, // Adds space at the top of the screen (adjust as needed)
    paddingHorizontal: 16, // Adds some padding on the left and right
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 25,
  },
  tasksContainer: {
    width: "80%", // 90% of the screen width
    height: width * 0.8, // Fixed height of 20 (you can adjust this if needed)
    borderWidth: 2, // Black 2px border
    borderColor: "#748a7c", // Set the border color to black
    borderRadius: 10, // Border radius for rounded corners (adjust as needed)
    marginHorizontal: "10%", // To center the container horizontally, using 5% on both sides
    paddingHorizontal: "8%", // To center the container horizontally, using 5% on both sides
    paddingVertical: "10%", // To center the container horizontally, using 5% on both sides
    backgroundColor: "#f5fbf3",
    marginTop: 50,

    // iOS Shadow
    shadowColor: "#000", // Shadow color (black)
    shadowOffset: { width: 0, height: 4 }, // Shadow position (move down by 4px)
    shadowOpacity: 0.3, // Shadow opacity (0 to 1, where 1 is fully opaque)
    shadowRadius: 6, // Radius of the shadow blur (larger number = softer shadow)

    // Android Shadow
    elevation: 5, // Elevation for Android (higher number = more intense shadow)
  },
  inputBox: {
    backgroundColor: "#fff", // White background for the input box
    width: "80%", // 80% of the screen width
    height: 50, // Height of the input box
    borderRadius: 25, // Pill shape
    paddingLeft: 16, // Padding to make text not touch the edges
    // marginTop: 100, // Spacing above the input box
    position: "absolute", // Positioning it absolutely
    bottom: 90, // 20px from the bottom
    alignSelf: "center", // Center it horizontally
    fontSize: 16, // Text size for input
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    elevation: 5, // Android shadow elevation
  },
  addButtonContainer: {
    position: "absolute", // Positioning it absolutely
    bottom: 20, // 20px from the bottom
    left: "50%", // Center horizontally
    transform: [{ translateX: -10 }], // Offset to truly center (half of button's width)
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#4caf50",
    borderRadius: 50, // Set this to half the button's size for a perfect circle
    width: 50, // Set a fixed width for the button
    height: 50, // Set a fixed height to match the width (circular shape)
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    elevation: 8, // Android shadow elevation
  },
});
