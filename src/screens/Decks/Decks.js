import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getDecks } from '../../utils/http';
import Screen from '../../components/Screen';
import Deck from '../../components/Deck/Deck';

const styles = StyleSheet.create({
  decksContainer: {
    margin: 20,
    display: 'grid',
    gridColumns: 2
  }
});

const DecksScreen = ({ navigation }) => {
  let decks = getDecks();

  let location = 'Deck';
  let deckList = decks.map(deck => (
    <Deck
      name={deck.name}
      id={deck.id}
      key={deck.id}
      logo={deck.logo}
      shortDesc={deck.shortDesc}
      onPress={() => navigation.push(location, { ...deck })}
    />
  ));

  return ( 
    <Screen>
      <ScrollView style={styles.decksContainer}>
        {deckList}
      </ScrollView>
    </Screen>
  );
}

export default DecksScreen;
