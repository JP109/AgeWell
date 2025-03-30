// app/index.js

import React from "react";
import { LogBox } from "react-native";
// import { AvatarProvider } from "./AvatarContext";
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
import loginBg from "../assets/images/welcome-logo.png";
import title from "../assets/images/title.png";
import { AvatarProvider } from "./AvatarContext";

export default function LandingPage() {
  LogBox.ignoreAllLogs();
  const router = useRouter();

  return (
    // <AvatarProvider>
    <View style={styles.container}>
      <Image source={title} style={styles.titleImage} />
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
    // </AvatarProvider>
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
  titleImage: {
    width: "100%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    borderRadius: 8,
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: 280,
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
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "#fff",
    color: "#2196F3",
  },
  buttonText: {
    color: "#4CAF50",
    fontSize: 18,
    fontWeight: "600",
  },
});
