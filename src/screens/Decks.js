import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { tabRoutes } from '../routes';
import { getDecks, getUsers } from '../utils/http';
import elements from '../theming/elements';
import Screen from '../components/Screen';
import Search from '../components/Search';
import DeckSummary from '../components/DeckSummary/DeckSummary';

const styles = StyleSheet.create({
  decksContainer: {},
  decksWrapper: {
    margin: 20,
    marginTop: 0,
  },
  input: {
    height: 40,
    ...elements.input
  }
});

const DecksScreen = (props) => {
  const { navigation, setHomeOptions } = props;
  const [completeDecklist, setCompleteDecklist] = useState([]);
  const [decklist, setDecklist] = useState([]);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const getDecks_ = async () => {
      try {
        const decks = await getDecks();
        setCompleteDecklist(decks);
        setDecklist(decks);
      } catch (e) {
        console.error(e);
      }
    };
    getDecks_();
  }, []);

  useEffect(() => {
    const getUsers_ = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (e) {
        console.error(e);
      }
    };
    getUsers_();
  }, []);

  useFocusEffect(() => {
    setHomeOptions({
      title: tabRoutes.find(route => route.component === DecksScreen).name,
    });
  }, [setHomeOptions]);

  const onSearch = (searchTerm) => {
    const matchingValues = completeDecklist.filter(deck => deck.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? [];
    setDecklist(matchingValues);
  }

  return ( 
    <Screen>
      <Search onSearch={onSearch} />
      <ScrollView style={styles.decksContainer}>
        <View style={styles.decksWrapper}>
          {decklist.map(deck => (
            <DeckSummary
              name={deck.name}
              id={deck.id}
              key={deck.id}
              logo={deck.logo}
              shortDesc={deck.shortDesc}
              author={users.find(user => user.id === deck.authorId)}
              onPress={() => navigation.push('Deck', { ...deck })}
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

DecksScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  setHomeOptions: PropTypes.func.isRequired
}

export default DecksScreen;
