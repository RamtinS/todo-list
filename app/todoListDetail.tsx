import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useLocalSearchParams, useNavigation,} from 'expo-router';
import {TodoList} from "@/models/TodoList";

export default function TodoListDetailScreen() {
  const { todoList } = useLocalSearchParams();
  const navigation = useNavigation();

  const parsedTodoList: TodoList | null = todoList ? JSON.parse(todoList as string) : null;

  useEffect(() => {
    if (parsedTodoList) {
      navigation.setOptions({ title: parsedTodoList.title });
    }
  }, [parsedTodoList, navigation]);

  return (
    <View style={styles.container}>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
