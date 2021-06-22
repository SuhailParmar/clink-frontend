import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../Button.js';
import DeckStyles from './Deck.styles.js';

const styles = StyleSheet.create(DeckStyles);

const Deck = ({ onPress, name, logo, shortDesc }) => {
  return (
    <View className="card" style={styles.deck}>
      <img src={logo} className="card-img-top" alt=""></img>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{shortDesc}</p>
        <Button
          title='View deck details'
          onPress={onPress}
          style={styles.button}
        />
      </div>
    </View>
  )
}

export default Deck;
