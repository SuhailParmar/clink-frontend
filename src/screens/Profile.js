import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Screen from '../components/Screen.js';
import DeckSummary from '../components/DeckSummary/DeckSummary.js';
import { getUser } from '../utils/http';

const ProfileScreen = ({ isOwnProfile }) => {
  const [user, setUser] = useState(null);
  const [decks, setDecks] = useState(null);

  useEffect(() => {
    const getUser_ = async () => {
      try {
        // todo get own id from user context
        const id_ = isOwnProfile ? '1' : id;
        const response = await getUser(id_);
        setUser(response);
      } catch (e) {
        console.error(e);
      }
    }
    getUser_();
  }, []);


  useEffect(() => {
    const getDecks_ = async (ids) => {
      try {
        const response = await getDecks(ids);
        setDecks(response);
      } catch (e) {
        console.warn(e);
      }
    }
    getDecks_();
  }, []);

  return (
    <Screen>
      <Text>Profile Screen</Text>
      {user && Object.entries(user).map(([key, value]) => <Text key={key}>{key}: {value}</Text>)}
      {decks && <>
        <Text>Decks</Text>
        <div>
          {decks.map(deck => 
            <DeckSummary {...deck} />
          )}
        </div>
        {/* <img src={user.picture}></img> */}
      </>}
    </Screen>
  );
};

ProfileScreen.defaultProps = {
  isOwnProfile: false
}

ProfileScreen.propTypes = {
  isOwnProfile: PropTypes.bool
}

export default ProfileScreen;
