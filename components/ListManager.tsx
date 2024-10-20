import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import SearchBar from './SearchBar';
import {TodoList} from "@/models/TodoList";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {router} from "expo-router";

export default function ListManager() {

  const [todoLists, setTodoLists] = useState<TodoList[]>([
    { title: 'Chores', completedItems: [], nonCompletedItems: [] },
    { title: 'Work Task', completedItems: [], nonCompletedItems: [] },
    { title: 'Fitness Goals', completedItems: [], nonCompletedItems: [] },
    { title: 'Reading List', completedItems: [], nonCompletedItems: [] },
    { title: 'Reading List', completedItems: [], nonCompletedItems: [] },
  ]);

  const [searchText, setSearchText] = useState('');

  const filteredTodoLists = todoLists.filter((todoList) =>
    todoList.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const deleteTodoList = (index: number) => {
    setTodoLists(todoLists => todoLists.filter((_, i) => i !== index));
  };

  const renderItem = ({ item, index }: { item: TodoList, index: number }) => (
    <View style={styles.itemContainer}>

      <TouchableOpacity
        onPress={() => router.push({ pathname: '/todoListDetail', params: { todoList: JSON.stringify(item) } })}
        style={styles.itemTextContainer}
      >
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {deleteTodoList(index)}}>
        <FontAwesome6 name="trash-can" size={24} color="black" style={styles.trashCan} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar onSearch={setSearchText} />
      <FlatList
        data={filteredTodoLists}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  list: {
    width: '100%',
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#090909',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 20,
    padding: 8,
  },
  trashCan: {
    marginLeft: 5,
    padding: 8,
  }
});