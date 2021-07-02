import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import elements from '../theming/elements';

const styles = StyleSheet.create({
  button: elements.button,
  text: elements.buttonText
});

const Button = ({ onPress, title, styleButton, styleText }) => {
  return (
    <Pressable style={[styles.button, styleButton]} onPress={onPress}>
      <Text style={[styles.text, styleText]}>{title}</Text>
    </Pressable>
  );
}

Button.defaultProps = {
  onPress: () => {},
  title: '',
  styleButton: {},
  styleText: {},
};

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  styleButton: PropTypes.any,
  styleText: PropTypes.any,
};

export default Button;
