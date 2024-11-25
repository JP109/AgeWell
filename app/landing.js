// LandingScreen.js

import CustomToggle from "@/components/CustomToggle";
import TaskWithCheckbox from "@/components/TaskCheckbox";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import wave1 from "../assets/images/wave7.png";

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

  // Filtered tasks based on `showCompleted` toggle
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      showCompleted ? task.taskFinished : !task.taskFinished
    );
  }, [tasks, showCompleted]);

  // Update task status when checkbox is checked/unchecked
  const updateTaskStatus = async (taskId, taskName, isChecked) => {
    console.log(taskId, isChecked);
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
            time: "03:18",
            taskFinished: isChecked,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Task updated successfully:", data);

        // Update local state immediately
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, taskFinished: isChecked } : task
          )
        );
      } else {
        console.error("Failed to update task:", data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Function to add a new task
  const sendTaskRequest = async (taskText) => {
    if (!taskText.trim()) return; // Don't send request if input is empty

    const defaultTaskDetails = {
      time: "03:18",
      taskFinished: false,
      notifications: true,
    };

    const taskData = {
      name: taskText,
      ...defaultTaskDetails,
    };

    try {
      const response = await fetch(
        "https://agewell.onrender.com/api/tasks/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, data]); // Add new task locally
      } else {
        console.error("Error adding task:", data.message);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle add task button click
  const handleAddTask = () => {
    sendTaskRequest(taskDetails.name);
    setTaskDetails({ ...taskDetails, name: "" });
    setDropdownVisible(false);
    Keyboard.dismiss();
  };

  const updateToggle = () => {
    setShowCompleted((prev) => !prev);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.waveContainer1}>
        <Image source={wave1} style={styles.waveImage} />
      </View> */}
      {!isDropdownVisible && (
        <View>
          <View style={styles.waveContainer2}>
            <Image source={wave1} style={styles.waveImage} />
          </View>
          <View style={styles.waveContainer3}>
            <Image source={wave1} style={styles.waveImage} />
          </View>
          <View style={styles.titleContainer} lightColor="#f5fbf3">
            <Text type="title" style={styles.titleText}>
              {" "}
              Daily Log{" "}
            </Text>
            <Icon name="clock-o" size={20} color="#000" />
          </View>

          {/* Toggle between "Tasks" and "Done" */}
          <View>
            <CustomToggle
              toggleText1="Tasks"
              toggleText2="Done"
              isToggled={showCompleted}
              onToggle={updateToggle}
            />
          </View>

          {/* Display filtered tasks */}
          <View style={styles.tasksContainer}>
            <ScrollView>
              {filteredTasks.map((task) => (
                <TaskWithCheckbox
                  key={task._id}
                  id={task._id}
                  taskText={task.name}
                  isChecked={task.taskFinished}
                  onToggle={(isChecked) =>
                    updateTaskStatus(task._id, task.name, isChecked)
                  }
                  onDelete={handleDeleteTask}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      <TextInput
        style={styles.inputBox}
        placeholder="Enter your task..."
        placeholderTextColor="#6e7880"
        value={taskDetails.name}
        onChangeText={(text) => setTaskDetails({ ...taskDetails, name: text })}
        onFocus={() => setDropdownVisible(true)}
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
    top: 100,
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
    bottom: -200,
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
