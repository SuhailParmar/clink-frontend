import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import colours from '../../theming/colours';

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dot: {
    backgroundColor: '#ffffff',
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: '50%',
    // webkitTransform: 'translateZ(0)',
    // msTransform: 'translateZ(0)',
    // transform: 'translateZ(0)',
    // webkitAnimationDelay: '-0.16s',
    // animationDelay: '-0.16s',
    // webkitAnimationFillMode: 'both',
    // animationFillMode: 'both',
    // webkitAnimation: 'load7 1.8s infinite ease-in-out',
    // animation: 'load7 1.8s infinite ease-in-out'
  },
  dotOne: {
    marginLeft: 'auto',
  },
  dotThree: {
    marginRight: 'auto',
  }
  // loader, 'loader:before', 'loader:after': {
  //   borderRadius: '50%',
  //   width: '2.5em',
  //   height: '2.5em',
  //   webkitAnimationFillMode: 'both',
  //   animationFillMode: 'both',
  //   webkitAnimation: 'load7 1.8s infinite ease-in-out',
  //   animation: 'load7 1.8s infinite ease-in-out'
  // },
  // // second dot
  // loader: {
  //   color: '#ffffff',
  //   fontSize: 10,
  //   margin: '80px auto',
  //   position: 'relative',
  //   textIndent: '-9999em',
  //   webkitTransform: 'translateZ(0)',
  //   msTransform: 'translateZ(0)',
  //   transform: 'translateZ(0)',
  //   webkitAnimationDelay: '-0.16s',
  //   animationDelay: '-0.16s'
  // },
  // 'loader:before', 'loader:after': {
  //   content: '',
  //   position: absolute,
  //   top: 0
  // },
  // // first dot
  // 'loader:before': {
  //   left: '-3.5em',
  //   webkitAnimationDelay: '-0.32s',
  //   animationDelay: '-0.32s'
  // },
  // //third dot
  // 'loader:after': {
  //   left: '3.5em'
  // },
  // // be full-sized for 1/4 of the total animation
  // '@keyframes load7': {
  //   '0%': {
  //     boxShadow: '0 2.5em 0 -1.3em'
  //   }, 
  //   '80%': {
  //     boxShadow: '0 2.5em 0 -1.3em'
  //   }, 
  //   '100%': {
  //     boxShadow: '0 2.5em 0 -1.3em'
  //   },
  //   '40%': {
  //     boxShadow: '0 2.5em 0 0'
  //   }
  // }
});

const Loading = ({ isLoading }) => {
  const growAnim = useRef(new Animated.Value(0)).current;
  // const growAnim = 0;

  // todo instance this
  useEffect(() => {
    Animated.timing(growAnim, {
      // toValue: 'translateZ(0)',
      duration: 1800,
      delay: 160
    }).loop();

    // stagger(150, 3, {
    //   duration: 1400,
    //   value: new Animated.Value(0),
    //   easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
    //   keyframes: [0, 40, 80, 100],
    // })

    // value.interpolate({
    //   inputRange: [-300, -100, 0, 100, 101],
    //   outputRange: [300, 0, 1, 0, 0]
    // }, {
    //   extrapolate: 'clamp'
    // });

  }, [growAnim])

  return (isLoading &&
    <View style={styles.container}>
      <Animated.View style={[
        styles.dot, 
        styles.dotOne, 
        { 
          transform: [{ 
            translateZ: growAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 0],
            }) 
          }]
        }]}
      />
      <Animated.View style={[styles.dot, styles.dotTwo, { transform: growAnim }]}/>
      <Animated.View style={[styles.dot, styles.dotThree, { transform: growAnim }]}/>
    </View>
  );
}

Loading.defaultProps = {
  isLoading: true
};

Loading.propTypes = {
  isLoading: PropTypes.bool
};

export default Loading;
