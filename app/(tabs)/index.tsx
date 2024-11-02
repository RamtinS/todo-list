import {SafeAreaView, KeyboardAvoidingView, StyleSheet, Platform} from "react-native";
import ListManager from "@/components/ListManager";

/**
 * Main tab for managing lists.
 * This tab serves as the home screen of the application.
 * It uses the ListManager component to display and manage the user's lists.
 *
 * @constructor
 */
export default function Index() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ListManager />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
