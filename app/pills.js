import {
  Dimensions,
  StyleSheet,
  Platform,
  Modal,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import CustomToggle from "@/components/CustomToggle";
import oldHag from "../assets/images/oldHag.png";

export default function PillsScreen() {
  const [selectedValue, setSelectedValue] = useState("1");
  const [amount, setAmount] = useState("1");
  const [duration, setDuration] = useState("1");
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handlePickerOpen = () => {
    if (Platform.OS === "ios") setPickerVisible(true);
  };
  const handlePickerClose = () => setPickerVisible(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.rightColumn}>
        <View style={styles.circle}>
          <Image source={oldHag} style={styles.circleImage} />
        </View>
      </View>
      <Text style={styles.titleText}>Add Plan</Text>
      <Text style={styles.titleText}>Pill Name</Text>

      <View style={styles.pickerWrapper}>
        {Platform.OS === "ios" ? (
          <>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={handlePickerOpen}
            >
              <ThemedText>{selectedValue}</ThemedText>
            </TouchableOpacity>
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
          </>
        ) : (
          <View style={styles.pickerContainer}>
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
        )}
      </View>

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
  titleText: {
    fontSize: 25,
    color: "#333",
    fontWeight: "bold",
  },
  rightColumn: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
    maxHeight: height * 0.2,
  },
  circle: {
    width: 135,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  circleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
