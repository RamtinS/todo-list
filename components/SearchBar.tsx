import React, {useState} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {SearchBarProps} from "@/models/Props";

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Search'}
        clearButtonMode={"always"}
        autoCorrect={false}
        style={styles.textInput}
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#090909",
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 18
  }
})