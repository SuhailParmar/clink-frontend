import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { tabRoutes } from '../routes';
import { getDecks } from '../utils/http';
import UserContext from '../contexts/UserContext';
import Profile from '../components/Profile';

const OwnProfileScreen = ({ navigation, route, setHomeOptions }) => {
  const [decks, setDecks] = useState(null);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    const getDecks_ = async (ids) => {
      try {
        const response = await getDecks(ids);
        setDecks(response);
      } catch (e) {
        console.error(e);
      }
    }
    getDecks_(currentUser.decks);
  }, [currentUser]);

  useFocusEffect(useCallback(() => {
    // set screen title
    setHomeOptions({
      title: tabRoutes.find(route => route.component === OwnProfileScreen).name,
    });
  }, [setHomeOptions]));

  return (
    <Profile 
      isOwnProfile
      user={currentUser}
      decks={decks}
      navigation={navigation}
    />
  );
};

OwnProfileScreen.propTypes = {
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired,
  setHomeOptions: PropTypes.func.isRequired,
}

export default OwnProfileScreen;
