import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import elements from '../theming/elements';

const styles = StyleSheet.create({
  input: {
    height: 40,
    ...elements.input
  }
});

const Search = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const search = (searchTerm) => {
    setSearchValue(searchTerm);
    onSearch(searchTerm);
  }

  return ( 
    <TextInput 
      onChangeText={search}
      value={searchValue}
      placeholder='Search here...'
      style={styles.input}
    />
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default Search