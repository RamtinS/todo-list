import {Stack} from "expo-router";
import {StatusBar, ActivityIndicator, View, StyleSheet} from "react-native";
import {initializeDirectoryAndIndex} from "@/utils/FileManager";
import {useEffect, useState} from "react";

// Main entry point for the application.
export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);

  // Create file directory and test data when starting app.
  useEffect((): void => {
    initializeAppResources().then((): void => {
      setIsInitialized(true);
    }).catch((error) => {
      console.error("Error initializing the app:", error);
    });
  }, []);

  const initializeAppResources: () => Promise<void> = async (): Promise<void> => {
    await initializeDirectoryAndIndex();
  };

  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

