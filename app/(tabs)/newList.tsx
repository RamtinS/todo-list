import {SafeAreaView, StyleSheet} from "react-native";
import CreateList from "@/components/CreateList";

export default function NewListScreen() {
  return(
    <SafeAreaView style={styles.container}>
      <CreateList/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
