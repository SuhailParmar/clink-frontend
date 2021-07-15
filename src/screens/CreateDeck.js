import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput, View, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { tabRoutes } from '../routes';
import UserContext from '../contexts/UserContext';
import elements from '../theming/elements';
import Screen from '../components/Screen';
import Search from '../components/Search';
import DeckSummary from '../components/DeckSummary/DeckSummary';

const styles = StyleSheet.create({
  decksContainer: {},
  decksWrapper: elements.containerScreen,
  input: {
    height: 40,
    ...elements.input,
  }
});

const CreateDeckScreen = ({ navigation, setHomeOptions }) => {
  const currentUser = useContext(UserContext);

  useFocusEffect(useCallback(() => {
    setHomeOptions({
      title: tabRoutes.find(route => route.component === CreateDeckScreen).name,
    });
  }, [setHomeOptions]));

  return ( 
    <Screen>
      <TextInput style={styles.input} />
      <TextInput style={styles.input} />
      <TextInput style={styles.input} />
    </Screen>
  );
}

CreateDeckScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  setHomeOptions: PropTypes.func.isRequired
}

export default CreateDeckScreen;
