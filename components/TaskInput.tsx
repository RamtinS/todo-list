import React, {useRef} from 'react';
import {TaskInputProps} from "@/models/Props";
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TaskInput( { newTask, setNewTask, handleNewTask } : TaskInputProps) {
  const inputRef = useRef<TextInput>(null);

  const addTaskAndRefocus: () => void = (): void => {
    handleNewTask();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={styles.addTaskContainer}>
      <TextInput
        style={styles.taskInput}
        placeholder={'Add new task'}
        clearButtonMode={"always"}
        autoCorrect={false}
        value={newTask}
        onChangeText={setNewTask}
        onSubmitEditing={addTaskAndRefocus}
        returnKeyType="done"
        blurOnSubmit={false}
      />

      <TouchableOpacity onPress={() => {handleNewTask()}}>
        <FontAwesome name="check" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  taskInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#090909",
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
})