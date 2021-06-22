import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import colours from '../theming/colours';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: colours.complement.normal,
    borderRadius: 4,
    boxShadow: '0 4px 5px rgba(0, 0, 0, 0.5)',
    cursor: 'pointer'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

const Button = ({ onPress, title }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export default Button;
