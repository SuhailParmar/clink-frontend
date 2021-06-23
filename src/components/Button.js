import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import elements from '../theming/elements';

const styles = StyleSheet.create({
  button: elements.button,
  text: elements.buttonText
});

// todo style merging
const Button = ({ onPress, title, style }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

Button.defaultProps = {
  onPress: () => {},
  style: {}
};

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.any,
};

export default Button;
