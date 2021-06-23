import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
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
    display: 'grid',
    gridColumns: 2
  },
  input: {
    height: 40,
    ...elements.input
  }
});

const DecksScreen = ({ navigation }) => {
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
}

export default DecksScreen;
