import {Stack} from "expo-router";
import {StatusBar} from "react-native";
import {initializeDirectoryAndIndex, initializeTestData} from "@/utils/FileManager";
import {useEffect} from "react";

// Main entry point for the application.
export default function RootLayout() {

  // Create file directory and test data when starting app.
  useEffect((): void => {
    initializeDirectoryAndIndex().catch((error) => {
      console.error("Failed to create data directory:", error);
    });

    initializeTestData(true).catch((error) => {
      console.error("Failed to create test data:", error);
    });

  }, []);

  return (
    <>
      <StatusBar barStyle="light-content"/>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="todoListDetail"/>
      </Stack>
    </>
  );
}

