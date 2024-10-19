import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

// Main entry point for the tabs for the application.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "My Lists",
          title: "My lists",
          tabBarIcon: ({ focused, color }) =>
            <Ionicons
              name={focused ? "list" : "list-outline"}
              color={color}
              size={24}
            />
        }}
      />
      <Tabs.Screen
        name="newList"
        options={{
          headerTitle: "New List",
          title: "New List",
          tabBarIcon: ({ focused, color }) =>
            <Ionicons
              name={focused ? "add" : "add-outline"}
              color={color}
              size={24}
            />
        }}
      />
    </Tabs>
  );
}

