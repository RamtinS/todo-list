import { Stack } from "expo-router";
import {StatusBar} from "react-native";

// Main entry point for the application.
export default function RootLayout() {
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

