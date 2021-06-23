import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import elements from '../theming/elements';

const styles = StyleSheet.create({
  button: elements.button,
  text: elements.buttonText
});

const Button = ({ onPress, title }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export default Button;
