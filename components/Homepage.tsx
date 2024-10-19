import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import SearchBar from './SearchBar';
import {TodoList} from "@/models/TodoList";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Homepage() {

  const [todoLists, setTodoLists] = useState<TodoList[]>([
    new TodoList('Shopping List'),
    new TodoList('Chores'),
    new TodoList('Work Tasks'),
    new TodoList('Fitness Goals'),
    new TodoList('Reading List'),
    new TodoList('Reading List'),
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
      <Text style={styles.itemText}>{item.title}</Text>
      <TouchableOpacity onPress={() => {deleteTodoList(index)}}>
        <FontAwesome6 name="trash-can" size={24} color="black" />
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
    padding: 16,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#090909',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 20,
  },
});