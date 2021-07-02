import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import elements from '../theming/elements';
import Screen from '../components/Screen';
import Button from '../components/Button';
import DeckSummary from '../components/DeckSummary/DeckSummary.js';

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

const Profile = ({
  isOwnProfile,
  user,
  decks,
  navigation,
}) => {

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
          {isOwnProfile && <Button title='Update profile' styleButton={styles.updateProfileButton} />}
        </View>
        <Text style={styles.containerText}>{isOwnProfile ? 'Your' : 'Their'} Decks</Text>
        {decks && <>
          <ScrollView style={styles.decksContainer}>
            <View style={styles.decksWrapper}>
              {decks.map(deck => 
                <DeckSummary
                  name={deck.name}
                  id={deck.id}
                  key={deck.id}
                  logo={deck.logo}
                  shortDesc={deck.shortDesc}
                  onPress={() => navigation.push('Deck', deck)}
                  isOwnDeck={isOwnProfile}
                />
              )}
            </View>
          </ScrollView>
        </>}
      </>}
    </Screen>
  );
};

Profile.defaultProps = {
  isOwnProfile: false,
  user: null,
  decks: null
}

Profile.propTypes = {
  isOwnProfile: PropTypes.bool,
  user: PropTypes.any,
  decks: PropTypes.any,
  navigation: PropTypes.any.isRequired,
}

export default Profile;
