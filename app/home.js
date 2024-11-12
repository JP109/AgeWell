// app/home.js (or wherever this component is located)

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./profile";
import WaterScreen from "./water";
import PillsScreen from "./pills";
import LandingScreen from "./landing";
// import { NavigationContainer } from "@react-navigation/native";
// No need to import NavigationContainer here

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator initialRouteName="Landing">
      <Tab.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Pills"
        component={PillsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Water"
        component={WaterScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
