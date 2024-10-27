import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TaskInput from "@/components/TaskInput";
import {saveNewTodoList} from "@/utils/FileManager";

export default function CreateList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const [title, setTitle] = useState('');

  /**
   * Function to handle adding a new task.
   */
  const handleNewTask = () => {
    if (newTask.trim()) {
      setTasks(prevTasks => [...prevTasks, newTask]);
      setNewTask('');
    }
  };

  /**
   * Function to delete a task.
   *
   * @param index The index of the task to be deleted.
   */
  const deleteTask = (index: number) => {
    setTasks(tasks => tasks.filter((_, i) => i !== index));
  };

  /**
   * Function to save a new list.
   */
  const handleSaveNewList = async () => {
    if (!title.trim()) {
      return;
    }
    await saveNewTodoList(title.trim(), [], tasks)
    setTitle('');
    setTasks([]);
  }

  const renderItem = ({ item, index }: { item: string, index: number}) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item}</Text>
      <TouchableOpacity onPress={() => {deleteTask(index)}}>
        <FontAwesome6 name="trash-can" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <TextInput
        style={[
          styles.titleInput, {backgroundColor: title.trim() ? '#ADD8E6' : "#fff"}
        ]}
        placeholder={'Title'}
        clearButtonMode={"always"}
        autoCorrect={false}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.descriptionText}> Tasks added: </Text>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
      />

      <TaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        handleNewTask={handleNewTask}
      />

      <Pressable
        style={({ pressed }) => [
          styles.saveButton, {backgroundColor: pressed ? '#388E3C' : (title.trim() ? '#4CAF50' : '#A9A9A9')}
        ]}
        onPress={handleSaveNewList}
        disabled={!title.trim()}
      >
        <Text style={styles.saveButtonText}>Save List</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
  },
  descriptionText: {
    paddingTop: 16,
    paddingBottom: 16,
    color: "#090909",
    fontSize: 18
  },
  titleInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#090909",
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 18
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
  saveButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
})
