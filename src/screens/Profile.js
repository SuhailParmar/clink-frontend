import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { tabRoutes } from '../routes';
import { getUser, getDecks } from '../utils/http';
import UserContext from '../contexts/UserContext';
import elements from '../theming/elements';
import Screen from '../components/Screen';
import Button from '../components/Button';
import DeckSummary from '../components/DeckSummary/DeckSummary.js';
import OwnProfileScreen from './OwnProfile';

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
  decksWrapper: elements.containerScreen,
  containerText: elements.containerText,
});

const ProfileScreen = (props) => {
  const { isOwnProfile, setHomeOptions, route, navigation } = props;
  const userId = route?.params?.userId;

  const [user, setUser] = useState(null);
  const [decks, setDecks] = useState(null);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    const getUser_ = async () => {
      try {
        if(isOwnProfile && !userId) { // todo sort out logic for passing props
          setUser(currentUser);
        } else {
          const response = await getUser(userId);
          setUser(response);
        }
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

  useFocusEffect(useCallback(() => {
    // set screen title
    if(isOwnProfile && !userId) { // todo
      setHomeOptions({
        title: tabRoutes.find(route => 
          route.component === OwnProfileScreen
          || route.component === ProfileScreen
        ).name,
      });
    } else {
      if(!user) return;
      navigation.setOptions({
        title: `${user.name}'s Profile`
      })
    }
  }, [setHomeOptions, user]));

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
          <Text style={styles.field}>Decks created: {user.decks.length}</Text>
          {isOwnProfile && <Button title='Update profile' style={styles.updateProfileButton} />}
        </View>
        <Text style={styles.containerText}>Your Decks</Text>
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
  isOwnProfile: false,
  setHomeOptions: () => {},
}

ProfileScreen.propTypes = {
  isOwnProfile: PropTypes.bool,
  setHomeOptions: PropTypes.func,
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired,
}

export default ProfileScreen;
