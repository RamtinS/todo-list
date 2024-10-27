import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ListDetailProps} from "@/models/Props";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Checkbox from 'expo-checkbox';
import TaskInput from "@/components/TaskInput";
import {saveExistingTodoList} from "@/utils/FileManager";

export default function ListDetail({ todoList }: ListDetailProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [nonCompleted, setNonCompleted] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (todoList) {
      setCompleted(todoList.completedTasks);
      setNonCompleted(todoList.nonCompletedTasks);
    }
  }, [todoList]);

  useEffect(() => {
    saveCurrentTodoList().then();
  }, [completed, nonCompleted]);

  const saveCurrentTodoList = async () => {
    if (todoList) {

      const updatedTodoList = {
        id: todoList.id,
        title: todoList.title,
        completedTasks: completed,
        nonCompletedTasks: nonCompleted,
      };

     await saveExistingTodoList(updatedTodoList)
    }
  }

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    if (isChecked) {
      const task = nonCompleted[index];
      setNonCompleted(prevNonCompleted => prevNonCompleted.filter((_, i) => i !== index));
      setCompleted(prevCompleted => [...prevCompleted, task]);
    } else {
      const task = completed[index];
      setCompleted(prevCompleted => prevCompleted.filter((_, i) => i !== index));
      setNonCompleted(prevNonCompleted => [...prevNonCompleted, task]);
    }
  }

  const handleNewTask = () => {
    if (newTask.trim()) {
      setNonCompleted(prevNonCompleted => [...prevNonCompleted, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index: number, isCompleted: boolean) => {
    if (isCompleted) {
      setCompleted(prevCompleted => prevCompleted.filter((_, i) => i !== index));
    } else {
      setNonCompleted(prevNonCompleted => prevNonCompleted.filter((_, i) => i !== index));
    }
  };

  const renderItem = ({ item, index, isCompleted }: { item: string, index: number, isCompleted: boolean }) => (
    <View style={styles.taskContainer}>
      <Checkbox  value={isCompleted} onValueChange={() => handleCheckboxChange(index, !isCompleted)} />
      <Text style={styles.taskText}>{item}</Text>
      <TouchableOpacity onPress={() => {deleteTask(index, isCompleted)}}>
        <FontAwesome6 name="trash-can" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.listContainer}>
        <Text style={styles.descriptionText}>Non-Completed Tasks:</Text>
        <FlatList
          data={nonCompleted}
          renderItem={({ item, index }) => renderItem({ item, index, isCompleted: false })}
          keyExtractor={(_item, index) => `nonCompleted-${index}`}
          style={styles.flatList}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.descriptionText}>Completed Tasks:</Text>
        <FlatList
          data={completed}
          renderItem={({ item, index }) => renderItem({ item, index, isCompleted: true })}
          keyExtractor={(_item, index) => `completed-${index}`}
          style={styles.flatList}
        />
      </View>

      <TaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        handleNewTask={handleNewTask}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  listContainer: {
    flex: 1,
    marginBottom: 10,
  },
  descriptionText: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "#090909",
    fontSize: 18
  },
  flatList: {
    flexGrow: 0,
    height: '100%',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#090909',
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
  },
  taskText: {
    fontSize: 16,
  },
  taskInput: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
})