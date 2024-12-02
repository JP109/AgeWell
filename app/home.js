// app/home.js (or wherever this component is located)

import React from "react";
import { AvatarProvider } from "./AvatarContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./profile";
import WaterScreen from "./water";
import PillsScreen from "./pills";
import LandingScreen from "./landing";
import { Text, Image } from "react-native";
import AvatarScreen from "./avatar";
// import { NavigationContainer } from "@react-navigation/native";
// No need to import NavigationContainer here

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <AvatarProvider>
      <Tab.Navigator
        initialRouteName="Landing"
        screenOptions={{
          tabBarActiveTintColor: "#4CAF50", // Active tab color
          tabBarInactiveTintColor: "#888", // Inactive tab color
          tabBarStyle: { backgroundColor: "#f8f8f8" }, // Tab bar background color
          headerShown: false, // Hides the header for all tabs
        }}
      >
        <Tab.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            tabBarLabel: "Home", // Label under the icon
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/images/home.png")} // Path to your custom icon
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  resizeMode: "contain",
                }} // Set width, height, and color
              />
            ),
          }}
        />
        <Tab.Screen
          name="Pills"
          component={PillsScreen}
          options={{
            tabBarLabel: "Pills", // Label under the icon
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/images/vaadin_pills.png")}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  resizeMode: "contain",
                }} // Set width, height, and color
              />
            ),
          }}
        />
        <Tab.Screen
          name="Water"
          component={WaterScreen}
          options={{
            tabBarLabel: "Water", // Label under the icon
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/images/water-nav.png")}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  resizeMode: "contain",
                }} // Set width, height, and color
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile", // Label under the icon
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/images/PROFILE.png")}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  resizeMode: "contain",
                }} // Set width, height, and color
              />
            ),
          }}
        />
      </Tab.Navigator>
    </AvatarProvider>
  );
}
