import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { getUser, getDecks } from '../utils/http';
import Profile from '../components/Profile';

const ProfileScreen = ({ navigation, route: { params : { userId } }  }) => {
  const [user, setUser] = useState(null);
  const [decks, setDecks] = useState(null);

  useEffect(() => {
    const getUser_ = async () => {
      try {
        const response = await getUser(userId);
        setUser(response);
      } catch (e) {
        console.error(e);
      }
    }
    getUser_();
  }, []);


  useEffect(() => {
    if(!user) return;
    const getDecks_ = async (ids) => {
      try {
        const response = await getDecks(ids);
        setDecks(response);
      } catch (e) {
        console.error(e);
      }
    }
    getDecks_(user.decks);
  }, [user]);

  useFocusEffect(useCallback(() => {
    // set screen title
    if(!user) return;
    navigation.setOptions({
      title: `${user.name}'s Profile`
    })
  }, [user]));

  return (
    <Profile 
      isOwnProfile={false}
      user={user}
      decks={decks}
      navigation={navigation}
    />
  );
};

ProfileScreen.propTypes = {
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired,
}

export default ProfileScreen;
