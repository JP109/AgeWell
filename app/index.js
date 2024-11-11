// app/index.js

import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import loginBg from "../assets/images/login-bg.jpg";
import title from "../assets/images/title.jpg";

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>AgeWell</Text> */}
      <Image source={title} style={styles.backgroundImage} />
      <Image source={loginBg} style={styles.backgroundImage} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3c9864",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  backgroundImage: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    borderRadius: 8,
    overflow: "hidden",
  },
  imageOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent overlay to improve text readability
    padding: 10,
    borderRadius: 8,
  },
  imageText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
