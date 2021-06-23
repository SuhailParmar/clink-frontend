import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';
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

Button.defaultProps = {
  onPress: () => {}
};

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string
};

export default Button;
