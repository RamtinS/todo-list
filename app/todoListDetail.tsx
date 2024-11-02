import React, {useEffect} from 'react';
import {SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, View, Text} from 'react-native';
import {useLocalSearchParams, useNavigation,} from 'expo-router';
import {TodoList} from "@/models/TodoList";
import ListDetail from "@/components/ListDetail";

export default function TodoListDetailScreen() {
  const navigation = useNavigation();

  const { todoList } = useLocalSearchParams();
  const parsedTodoList: TodoList | null = todoList ? JSON.parse(todoList as string) : null;

  useEffect(() => {
    if (parsedTodoList) {
      navigation.setOptions({ title: parsedTodoList.title });
    }
  }, [parsedTodoList, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        { parsedTodoList ? (
          <ListDetail todoList={parsedTodoList} />
        ) : (
          <Text style={styles.errorText}>Error: List not found.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
  },
});
