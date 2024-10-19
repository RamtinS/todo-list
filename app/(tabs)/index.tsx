import { Text, View, StyleSheet } from "react-native";
import Homepage from "@/components/Homepage";

export default function Index() {
  return (
    <View style={styles.container}>
      <Homepage />
    </View>
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
