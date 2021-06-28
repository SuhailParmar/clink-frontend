import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { tabRoutes } from '../routes';
import Screen from '../components/Screen.js';

const FriendsScreen = ({ setHomeOptions }) => {

  useFocusEffect(() => {
    setHomeOptions({
      title: tabRoutes.find(route => route.component === FriendsScreen).name,
    });
  }, [setHomeOptions]);

  return (
    <Screen>
      <Text>
        Friends
      </Text>
    </Screen>
  );
}

FriendsScreen.propTypes = {
  setHomeOptions: PropTypes.func.isRequired
}

export default FriendsScreen;
