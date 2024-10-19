import React, {useState} from 'react';
import {FlatList, View, StyleSheet, Text, TextInput, TouchableOpacity, Button} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function CreateList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

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
   * Function to handle keyboard input.
   */
  const handleKeyInput = () => {
    handleNewTask();
  };

  /**
   * Function to delete a task.
   *
   * @param index The index of the task to be deleted.
   */
  const deleteTask = (index: number) => {
    setTasks(tasks => tasks.filter((_, i) => i !== index));
  };

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
        style={styles.titleInput}
        placeholder={'Title'}
        clearButtonMode={"always"}
        autoCorrect={false}
      />

      <Text style={styles.descriptionText}> Tasks added: </Text>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
      />

      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.taskInput}
          placeholder={'Add new task'}
          clearButtonMode={"always"}
          autoCorrect={false}
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={handleKeyInput}
          returnKeyType="done"
        />

        <TouchableOpacity onPress={() => {handleNewTask()}}>
          <FontAwesome name="check" size={24} color="black" />
        </TouchableOpacity>
      </View>



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
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
})
