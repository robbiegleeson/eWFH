import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Search = ({ setSearchTerm, searchTerm }) => {

  const onChangeSearch = (searchQuery) => setSearchTerm(searchQuery);

  return (
    <Searchbar
      style={styles.searchStyle}
      inputStyle={{ fontSize: 12 }}
      value={searchTerm}
      onChangeText={onChangeSearch}
      placeholder="Search by provider/category/month"
    />
  )
}

const styles = StyleSheet.create({
  searchStyle: {
    borderRadius: 10,
    elevation: 0,
    height: 34,
  },
});

export default Search;
