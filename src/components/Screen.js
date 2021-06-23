import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import colours from '../theming/colours';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.secondary.lighter,
    justifyContent: 'center',
  },
});

const Screen = ({ children }) => <View style={styles.container}>{children}</View>

Screen.propTypes = {
  children: PropTypes.node.isRequired
};


export default Screen;
