import {SafeAreaView, StyleSheet} from "react-native";
import ListManager from "@/components/ListManager";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ListManager />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#090909"
  },
});
