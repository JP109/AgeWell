import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CheckBox from "react-native-checkbox"; // Use this instead
import trash from "../assets/images/trash.png";
// @ts-ignore

interface TaskWithCheckboxProps {
  taskText: string;
  isChecked: boolean;
  onToggle: (isChecked: boolean) => void;
}

const TaskWithCheckbox: React.FC<TaskWithCheckboxProps> = ({
  id,
  taskText,
  isChecked: initialChecked,
  onToggle,
  onDelete,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

  const handleToggle = (newValue: boolean) => {
    console.log("Checkbox toggled:", newValue); // Debugging log
    setIsChecked(newValue);
    onToggle(newValue); // Call the parent handler to update the backend
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "https://agewell.onrender.com/api/tasks/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: taskText,
          }),
        }
      );

      if (response.ok) {
        console.log("Task deleted successfully");
        onDelete(id); // Notify parent to remove task from local state
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <View style={styles.taskContainer}>
      <View style={styles.check}>
        <CheckBox
          value={isChecked}
          onValueChange={(newValue: any) => setIsChecked(newValue)}
          style={styles.checkbox}
          label={null}
          checked={isChecked}
          onChange={(checked: any) => handleToggle(!checked)}
        />
        <Text style={[styles.taskText, isChecked && styles.completedText]}>
          {taskText}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <View style={styles.iconContainer}>
          <Image source={trash} style={styles.iconImage} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    marginBottom: 10,
    padding: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#c2c2c2",
  },
  checkbox: {
    marginRight: 10,
  },
  check: {
    width: 80,
    display: "flex",
    flexDirection: "row",
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
    marginBottom: 10,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  iconContainer: {
    width: 25,
    height: 25,
  },
  iconImage: {
    maxHeight: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
  },
});

export default TaskWithCheckbox;
