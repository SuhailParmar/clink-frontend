import React from 'react';
import { View, StyleSheet } from 'react-native';
import colours from '../theming/colours';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.secondary.lighter,
    justifyContent: 'center',
  },
});

const Screen = ({ children }) => <View style={styles.container}>{children}</View>

export default Screen;
