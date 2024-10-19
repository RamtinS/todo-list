import {View, StyleSheet, Text} from "react-native";
import CreateList from "@/components/CreateList";

export default function NewListScreen() {
  return(
    <View style={styles.container}>
      <CreateList/>
    </View>
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
