import { Dimensions, StyleSheet, TextInput, Image, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomToggle from "@/components/CustomToggle";
import TaskWithCheckbox from "@/components/TaskCheckbox";
import { TouchableOpacity, View } from "react-native";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useState, useMemo } from "react";
import wave1 from "../assets/images/wave7.png";

export default function LandingScreen() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    time: "",
    taskFinished: false,
    notifications: false,
  });
  const [showCompleted, setShowCompleted] = useState(false); // Track toggle state
  // Fetch tasks from the API
  useEffect(() => {
    console.log(showCompleted);
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://agewell.onrender.com/api/tasks/");
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data.filter((task) => !task.taskFinished));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("hello?");
    let arr = tasks.filter((task) =>
      showCompleted ? task.taskFinished : !task.taskFinished
    );
    setFilteredTasks(arr);
  }, [showCompleted]);
  // Memoize filtered tasks based on toggle state
  const filteredTask = useMemo(() => {
    return tasks.filter((task) =>
      showCompleted ? task.taskFinished : !task.taskFinished
    );
  }, [tasks, showCompleted]);

  const updateTaskStatus = async (taskName, isChecked) => {
    console.log(taskName, isChecked);
    try {
      const response = await fetch(
        "https://agewell.onrender.com/api/tasks/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: taskName,
            taskFinished: isChecked,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Task updated successfully:", data);
      } else {
        console.error("Failed to update task:", data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  // Function to send a POST request
  const sendTaskRequest = async (taskText) => {
    if (!taskText.trim()) return; // Don't send request if input is empty

    // Define default values for the other fields
    const defaultTaskDetails = {
      time: "03:18", // Default time
      taskFinished: false, // Default value for taskFinished
      notifications: true, // Default value for notifications
    };

    // Prepare the task data to send
    const taskData = {
      name: taskText,
      ...defaultTaskDetails, // Spread default task details
    };

    try {
      const response = await fetch(
        "https://agewell.onrender.com/api/tasks/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData), // Send task data with defaults
        }
      );
      if (!response.ok) {
        console.error("Error:", response.statusText);
      }
      const data = await response.json();
      console.log("Response data:", data);

      // Optionally update tasks state here after adding the task
      setTasks((prevTasks) => [...prevTasks, data]); // Assuming API returns the newly added task
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle add task button click
  const handleAddTask = () => {
    sendTaskRequest(taskDetails.name); // Send request with task name
    setTaskDetails({ ...taskDetails, name: "" }); // Clear input field after submitting
  };
  const updateToggle = () => {
    console.log(":(");
    setShowCompleted((prev) => !prev);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.waveContainer1}>
        <Image source={wave1} style={styles.waveImage} />
      </View>
      <View style={styles.waveContainer2}>
        <Image source={wave1} style={styles.waveImage} />
      </View>
      <View style={styles.waveContainer3}>
        <Image source={wave1} style={styles.waveImage} />
      </View>
      <View style={styles.titleContainer} lightColor="#f5fbf3">
        <Text type="title" style={styles.titleText}>
          {" "}
          Daily Log
        </Text>
        <Icon name="clock-o" size={20} color="#000" />
      </View>

      {/* Toggle between "Task" and "Done" */}
      <View>
        <CustomToggle
          toggleText1="Tasks"
          toggleText2="Done"
          isToggled={showCompleted}
          onToggle={() => updateToggle(showCompleted)}
        />
      </View>

      {/* Display filtered tasks */}
      <View style={styles.tasksContainer}>
        {filteredTasks.map((task) => (
          <TaskWithCheckbox
            key={task._id}
            taskText={task.name}
            isChecked={task.taskFinished}
            onToggle={(isChecked) => updateTaskStatus(task.name, isChecked)}
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter your task..."
          placeholderTextColor="#6e7880" // Grey text for placeholder
          value={taskDetails.name}
          onChangeText={(text) =>
            setTaskDetails({ ...taskDetails, name: text })
          }
        />

        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Icon name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
}

// Get the screen width dynamically
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#62cdfa",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 24, // Increased size for the "+" symbol
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5fbf3",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 25,
  },
  tasksContainer: {
    width: "80%",
    height: width * 0.8,
    borderWidth: 2,
    borderColor: "#748a7c",
    borderRadius: 10,
    marginHorizontal: "10%",
    paddingHorizontal: "8%",
    paddingVertical: "10%",
    backgroundColor: "#f5fbf3",
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    overflow: "scroll",
  },
  inputBox: {
    backgroundColor: "#fff",
    width: "80%",
    height: 50,
    borderRadius: 25,
    paddingLeft: 16,
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -10 }],
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#4caf50",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  titleText: {
    fontSize: 25,
    color: "#333",
    fontWeight: "bold",
  },
});
