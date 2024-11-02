import React, {useEffect} from 'react';
import {SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, View, Text} from 'react-native';
import {useLocalSearchParams, useNavigation,} from 'expo-router';
import {TodoList} from "@/models/TodoList";
import ListDetail from "@/components/ListDetail";

/**
 * Screen for displaying and managing details of a list.
 * It uses the ListDetail component to display the tasks.
 *
 * @constructor
 */
export default function TodoListDetailScreen() {
  const navigation = useNavigation();

  const { todoList } = useLocalSearchParams();
  const parsedTodoList: TodoList | null = todoList ? JSON.parse(todoList as string) : null;

  /**
   * Sets the title of the screen to the title of the list when the screen is mounted.
   */
  useEffect(() => {
    if (parsedTodoList) {
      navigation.setOptions({ title: parsedTodoList.title });
    }
  }, [parsedTodoList, navigation]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.container}>
          { parsedTodoList ? (
            <ListDetail todoList={parsedTodoList} />
          ) : (
            <Text style={styles.errorText}>Error: List not found.</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardContainer: {
    flex: 1,
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
