import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export default function LoginPage() {
  const [username, setUsername] = useState(""); // This will be the email
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [pushToken, setPushToken] = useState(null);

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  // Function to get the push token
  const registerForPushNotifications = async () => {
    console.log("hi", Device.isDevice);
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      console.log(existingStatus, 35);
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
      try {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: "2ef46b82-61a0-4480-80f2-896524cab418",
          applicationId: "agewell", // Replace with your actual application ID
        });
        console.log(
          "Push token!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:",
          token
        );
        setPushToken(token?.data);
        console.log(token, 44);
      } catch (error) {
        console.error("Error fetching Expo push token:", error);
      }
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }
  };

  const handleLogin = async () => {
    if (username && password) {
      try {
        // API login call
        const response = await fetch(
          "https://agewell.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: username,
              password: password,
              pushToken, // Send pushToken to your server
            }),
          }
        );
        console.log(pushToken, 68);

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful:", data);
          router.push("/home");
        } else {
          Alert.alert("Login failed", data.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        Alert.alert("Error", "Unable to connect. Please try again.");
      }
    } else {
      Alert.alert("Please fill out both fields");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#555",
  },
  signupLink: {
    fontSize: 16,
    color: "#2196F3",
    fontWeight: "600",
    marginLeft: 5,
  },
});
