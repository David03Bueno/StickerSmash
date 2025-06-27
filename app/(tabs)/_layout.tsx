import { Tabs } from "expo-router";
import React from "react";
import { LogBox } from "react-native";
import { Ionicons } from "@expo/vector-icons";

LogBox.ignoreAllLogs(true);
export default function TabsLayout() {
  return (
    <Tabs 
    screenOptions={{
      tabBarActiveTintColor:'#ffd33d',
      headerStyle:{
        backgroundColor:'#25292e'
      },
      headerShadowVisible:false,
      headerTintColor: '#fff',
      tabBarStyle:{
        backgroundColor:'#25292e'
      }
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: " Sticker Smash",
          tabBarIcon: ({focused, color})=> (
          <Ionicons 
          name={focused ? "home-sharp" : "home-outline"} 
          color={color}
          size={30}
          />)
        }}
      />
      <Tabs.Screen 
      name="about"
        options={{
          headerTitle: " Sticker Smash",
          tabBarIcon: ({focused, color})=> (
          <Ionicons 
          name={focused ? "information-circle" : "information-circle-outline"} 
          color={color}
          size={30}
          />)
        }}
      />

    </Tabs>
  );
}
