import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Button.js';
import DeckStyles from './DeckSummary.styles.js';

const styles = StyleSheet.create(DeckStyles);

const DeckSummary = ({ onPress, name, logo, shortDesc, author, isOwnDeck }) => {
  const [open, isOpen] = useState(false);

  const deckOnPress = () => {
    isOpen(!open);
  }

  return (
    <Pressable style={styles.button} onPress={deckOnPress}>
      <View className="card" style={styles.deck}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <Image source={require(`../../../assets/${logo}`)} style={styles.img} />
        </View>
        {open && <View style={styles.body}>
          <Text style={styles.description}>{shortDesc}</Text>
          {!isOwnDeck && <Text style={styles.description}>Author: {author.name}</Text>}
          <Button
            title={isOwnDeck ? 'Edit deck' : 'View deck details'}
            onPress={onPress}
            style={styles.button}
          />
        </View>}
      </View>
    </Pressable>
  )
}

DeckSummary.defaultProps = {
  onPress: () => {},
  name: 'Deck not found',
  logo: 'favicon.png',
  shortDesc: 'Deck description not found',
  author: { name: '' }, 
  isOwnDeck: false
}

DeckSummary.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string,
  logo: PropTypes.string,
  shortDesc: PropTypes.string,
  author: PropTypes.any,
  isOwnDeck: PropTypes.bool
}

export default DeckSummary;
