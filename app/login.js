import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const [username, setUsername] = useState(""); // This will be the email
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // Simple validation before login
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
              email: username, // Username is being used as the email
              password: password,
            }),
          }
        );

        const data = await response.json();

        // Handle response
        if (response.ok) {
          // Login success
          console.log("Login successful:", data);
          // Optionally store tokens or user data here
          router.push("/home");
        } else {
          // Login failed, show error message
          Alert.alert("Login failed", data.message || "Something went wrong.");
        }
      } catch (error) {
        // Handle network or other errors
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
