import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// @ts-ignore
import CheckBox from "react-native-checkbox"; // Use this instead

interface TaskWithCheckboxProps {
  taskText: string;
  isChecked: boolean;
  onToggle: (isChecked: boolean) => void;
}

const TaskWithCheckbox: React.FC<TaskWithCheckboxProps> = ({ taskText, isChecked: initialChecked, onToggle }) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

  const handleToggle = (newValue: boolean) => {
    console.log("Checkbox toggled:", newValue); // Debugging log
    setIsChecked(newValue);
    onToggle(newValue); // Call the parent handler to update the backend
  };

  return (
    <View style={styles.taskContainer}>
      <CheckBox
        label='Label'
        checked={isChecked}
        onChange={(checked: any) => handleToggle(!checked)}
      />
      <Text style={[styles.taskText, isChecked && styles.completedText]}>
        {taskText}
      </Text>
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
  },
  checkbox: {
    marginRight: 10,
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
});

export default TaskWithCheckbox;
