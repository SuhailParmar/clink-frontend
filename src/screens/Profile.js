import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Screen from '../components/Screen';
import Button from '../components/Button';
import DeckSummary from '../components/DeckSummary/DeckSummary.js';
import { getUser, getDecks } from '../utils/http';
import elements from '../theming/elements';

const styles = StyleSheet.create({
  profile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    backgroundColor: elements.input.backgroundColor,
    margin: 20,
    padding: 20,
    borderRadius: 3,
    boxShadow: '0 4px 5px rgba(0, 0, 0, 0.2)'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profilePicture: {
    justifySelf: 'flex-end',
    height: 40,
    width: 40,
  },
  field: {
    alignSelf: 'flex-start'
  },
  updateProfileButton: {
    marginTop: 10
  },
  decksContainer: {},
  decksWrapper: {
    margin: 20,
    marginTop: 0,
  },
});

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
        console.error(e);
      }
    }
    getDecks_();
  }, []);

  return (
    <Screen>
      {user && <>
        <View style={styles.profile}>
          <View style={styles.header}>
            <Text style={styles.name}>{user.name}</Text>
            <Image source={require(`../../assets/${user.profilePicture}`)} style={styles.profilePicture} />
          </View>
          <Text style={styles.field}>Email address: {user.email}</Text>
          <Text style={styles.field}>Games played: {user.gamesPlayed}</Text>
          <Text style={styles.field}>Games won: {user.gamesWon}</Text>
          <Text style={styles.field}>Decks created: {user.decks}</Text>
          <Button title='Update profile' style={styles.updateProfileButton} />
        </View>
        <Text>Your Decks</Text>
        {decks && <>
          <ScrollView style={styles.decksContainer}>
            <View style={styles.decksWrapper}>
              {decks.filter(deck => deck.authorId === user.id).map(deck => 
                <DeckSummary
                  name={deck.name}
                  id={deck.id}
                  key={deck.id}
                  logo={deck.logo}
                  shortDesc={deck.shortDesc}
                  onPress={() => navigation.push('Deck', { ...deck })}
                  isOwnDeck
                />
              )}
            </View>
          </ScrollView>
        </>}
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
