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
        const { data } = await getUser(userId);
        setUser(data);
      } catch (e) {
        console.error(e);
      }
    }
    getUser_();
  }, []);


  useEffect(() => {
    if(!user) return;
    const getDecks_ = async (id) => {
      try {
        const { data } = await getDecks(id);
        setDecks(data);
      } catch (e) {
        console.error(e);
      }
    }
    getDecks_(user.id);
  }, [user]);

  useFocusEffect(useCallback(() => {
    // set screen title
    if(!user) return;
    navigation.setOptions({
      title: `${user.firstName}'s Profile`
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
