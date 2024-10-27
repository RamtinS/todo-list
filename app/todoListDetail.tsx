import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
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
    <View style={styles.container}>
      { parsedTodoList ? (
        <ListDetail todoList={parsedTodoList} />
      ) : (
        <Text style={styles.errorText}>Error: List not found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
  },
});
