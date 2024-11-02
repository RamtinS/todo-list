import React, {useEffect, useState} from 'react';
import {SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ListDetailProps} from "@/models/Props";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Checkbox from 'expo-checkbox';
import TaskInput from "@/components/TaskInput";
import {saveExistingTodoList} from "@/utils/FileManager";

/**
 * ListDetail component displays and manages tasks within a list.
 * It allows users to add and delete tasks, and change the status of the tasks.
 *
 * @param todoList - Prop containing the list object.
 * @constructor
 */
export default function ListDetail({ todoList }: ListDetailProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [nonCompleted, setNonCompleted] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  /**
   * Loads tasks from the provided list when the component mounts.
   */
  useEffect((): void => {
    if (todoList) {
      setCompleted(todoList.completedTasks);
      setNonCompleted(todoList.nonCompletedTasks);
    }
  }, [todoList]);

  /**
   * Saves the current state of the list to file storage whenever the completed
   * or non-completed task lists change.
   */
  useEffect((): void => {
    saveCurrentTodoList().then();
  }, [completed, nonCompleted]);

  /**
   * Saves the current list.
   */
  const saveCurrentTodoList: () => Promise<void> = async (): Promise<void> => {
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

  /**
   * Moves a task between the completed and non-completed lists.
   *
   * @param {number} index - The index of the task in the list.
   * @param {boolean} isCompleted - Indicates if the task is in the completed list.
   */
  const handleCheckboxChange = (index: number, isCompleted: boolean) => {
    if (isCompleted) {
      // Move from completed to non-completed.
      const task = completed[index];
      setCompleted(prevCompleted => prevCompleted.filter((_, i) => i !== index));
      setNonCompleted(prevNonCompleted => [...prevNonCompleted, task]);
    } else {
      // Move from non-completed to completed.
      const task = nonCompleted[index];
      setNonCompleted(prevNonCompleted => prevNonCompleted.filter((_, i) => i !== index));
      setCompleted(prevCompleted => [...prevCompleted, task]);
    }
  }

  /**
   * Adds a new task to the non-completed task list.
   * Clears the input after adding the task.
   */
  const handleNewTask = () => {
    if (newTask.trim()) {
      setNonCompleted(prevNonCompleted => [...prevNonCompleted, newTask]);
      setNewTask('');
    }
  };

  /**
   * Deletes a task from either the completed or non-completed list based on its state.
   *
   * @param {number} index - The index of the task to delete.
   * @param {boolean} isCompleted - Indicates if the task is in the completed list.
   */
  const deleteTask = (index: number, isCompleted: boolean) => {
    if (isCompleted) {
      setCompleted(prevCompleted => prevCompleted.filter((_, i) => i !== index));
    } else {
      setNonCompleted(prevNonCompleted => prevNonCompleted.filter((_, i) => i !== index));
    }
  };

  /**
   * Function to render individual list items.
   *
   * @param item The item to render.
   * @param index The index of the item.
   * @param section The section the item belongs to.
   */
  const renderItem = ({ item, index, section }: { item: string, index: number, section: { title: string } }) => {
    const isInCompletedList = (section.title === 'Completed Tasks');
    return(
      <View style={styles.taskContainer}>

        <Checkbox
          value={isInCompletedList}
          onValueChange={() => handleCheckboxChange(index, isInCompletedList)} />

        <Text style={styles.taskText}>{item}</Text>

        <TouchableOpacity onPress={() => {deleteTask(index, isInCompletedList)}}>
          <FontAwesome6 name="trash-can" size={24} color="black" />
        </TouchableOpacity>

      </View>
    );
  };

  const sections = [
    { title: 'Non-Completed Tasks', data: nonCompleted },
    { title: 'Completed Tasks', data: completed }
  ];

  return (
    <View style={styles.container}>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.descriptionText}>{title}</Text>
        )}
      />

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
  descriptionText: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "#090909",
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
})