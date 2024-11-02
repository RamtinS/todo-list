import {SafeAreaView, KeyboardAvoidingView, StyleSheet, Platform} from "react-native";
import CreateList from "@/components/CreateList";

export default function NewListScreen() {
  return(
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <CreateList/>
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
})
