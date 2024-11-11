import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// @ts-ignore
import CheckBox from "react-native-checkbox";

const TaskWithCheckbox = ({ taskText, isChecked: initialChecked }) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

  return (
    <View style={styles.taskContainer}>
      <CheckBox
        value={isChecked}
        onValueChange={(newValue: any) => setIsChecked(newValue)}
        style={styles.checkbox}
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
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});

export default TaskWithCheckbox;
