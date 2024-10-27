import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import SearchBar from './SearchBar';
import {TodoList, TodoListMeta} from "@/models/TodoList";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {router} from "expo-router";
import {deleteTodoList, loadTodoList, loadTodoListMeta} from "@/utils/FileManager";

export default function ListManager() {

  const [todoLists, setTodoLists] = useState<TodoListMeta[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchTodoLists().then();
  })

  const fetchTodoLists = async () => {
    const lists: TodoListMeta[] = await loadTodoListMeta();
    setTodoLists(lists);
  };

  const filteredTodoLists = todoLists.filter((todoListMeta) =>
    todoListMeta.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeleteTodoList = async (id: number) => {
    const deleted: boolean = await deleteTodoList(id)
    if (deleted) {
      setTodoLists(todoLists => todoLists.filter(todoList => todoList.id !== id));
    }
  };

  const handleTodoListPress = async (id: number) => {
    const todoList: TodoList | null = await loadTodoList(id);
    if (todoList) {
      router.push({ pathname: '/todoListDetail', params: { todoList: JSON.stringify(todoList) } });
    } else {
      console.error(`Todo list with id ${id} not found`);
    }
  };

  const renderItem = ({ item }: { item: TodoListMeta }) => (
    <View style={styles.itemContainer}>

      <TouchableOpacity
        onPress={() => handleTodoListPress(item.id)}
        style={styles.itemTextContainer}
      >
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {handleDeleteTodoList(item.id)}}>
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
        keyExtractor={(item) => item.id.toString()}
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