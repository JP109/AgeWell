import {
  Dimensions,
  StyleSheet,
  Platform,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import CustomToggle from "@/components/CustomToggle";

export default function PillsScreen() {
  const [selectedValue, setSelectedValue] = useState("1");
  const [amount, setAmount] = useState("1");
  const [duration, setDuration] = useState("1");
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handlePickerOpen = () => setPickerVisible(true);
  const handlePickerClose = () => setPickerVisible(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.rightColumn}>
        <View style={styles.circle}>
          {/* Replace with your image source */}
        </View>
      </View>
      <ThemedView style={styles.titleContainer} lightColor="#f5fbf3">
        <ThemedText type="title">Add Plan</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer} lightColor="#f5fbf3">
        <ThemedText type="title">Pill Name</ThemedText>
      </ThemedView>

      <View style={styles.pickerWrapper}>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={handlePickerOpen}
        >
          <ThemedText>{selectedValue}</ThemedText>
        </TouchableOpacity>

        {Platform.OS === "ios" && (
          <Modal transparent visible={isPickerVisible} animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <TouchableOpacity onPress={handlePickerClose}>
                  <ThemedText style={styles.doneButton}>Done</ThemedText>
                </TouchableOpacity>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                </Picker>
              </View>
            </View>
          </Modal>
        )}
      </View>

      {/* Rest of your code */}
      <CustomToggle />
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 25,
    backgroundColor: "#fff",
  },
  rightColumn: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
    maxHeight: height * 0.2,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ccc",
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
});
