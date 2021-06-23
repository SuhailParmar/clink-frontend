import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Button.js';
import DeckStyles from './DeckSummary.styles.js';

const styles = StyleSheet.create(DeckStyles);

const DeckSummary = ({ onPress, name, logo, shortDesc }) => {
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

DeckSummary.defaultProps = {
  onPress: () => {},
  name: '',
  logo: '',
  shortDesc: ''
}

DeckSummary.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string,
  logo: PropTypes.string,
  shortDesc: PropTypes.string
}

export default DeckSummary;
