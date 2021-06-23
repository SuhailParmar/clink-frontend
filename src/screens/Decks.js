import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { getDecks } from '../utils/http';
import elements from '../theming/elements';
import Screen from '../components/Screen';
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
  const [searchValue, setSearchValue] = useState('');
  const [completeDecklist, setCompleteDecklist] = useState([]);
  const [decklist, setDecklist] = useState([]);

  let location = 'Deck'; // todo
  
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

  const search = (searchTerm) => {
    setSearchValue(searchTerm);
    const matchingDecks = completeDecklist.filter(deck => deck.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? [];
    console.log(completeDecklist, matchingDecks);
    setDecklist(matchingDecks);
  }

  return ( 
    <Screen>
      <TextInput 
        onChangeText={search}
        value={searchValue}
        placeholder='Search here...'
        style={styles.input}
      />
      <ScrollView style={styles.decksContainer}>
        <View style={styles.decksWrapper}>
          {decklist.map(deck => (
            <DeckSummary
              name={deck.name}
              id={deck.id}
              key={deck.id}
              logo={deck.logo}
              shortDesc={deck.shortDesc}
              onPress={() => navigation.push(location, { ...deck })}
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
