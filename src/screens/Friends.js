import React, { useState, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { tabRoutes } from '../routes';
import { getFriends, removeFriend, getUsers } from '../utils/http';
import UserContext from '../contexts/UserContext';
import elements from '../theming/elements';
import Button from '../components/Button.js';
import Screen from '../components/Screen.js';
import Search from '../components/Search.js';

const styles = StyleSheet.create({
  friendsContainer: {},
  friendsWrapper: elements.containerScreen,
  buttonWrapper: {
    ...elements.containerBase,
    marginBottom: 5
  },
  input: {
    height: 40,
    ...elements.input
  },
  friendSummary: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    backgroundColor: elements.input.backgroundColor,
    margin: 10,
    padding: 20,
    borderRadius: 3,
    boxShadow: '0 4px 5px rgba(0, 0, 0, 0.2)'
  },
});

const FriendsScreen = ({ navigation, setHomeOptions }) => {
  const [completeFriendsList, setCompleteFriendsList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const currentUser = useContext(UserContext);
  
  useFocusEffect(useCallback(() => {
    const getFriends_ = async () => {
      try {
        const friendsIds = await getFriends(currentUser.id);
        if(friendsIds.length > 0) {
          const friends = await getUsers(friendsIds);
          setCompleteFriendsList(friends);
          setFriendsList(friends);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getFriends_();
  }, []));

  useFocusEffect(useCallback(() => {
    setHomeOptions({
      title: tabRoutes.find(route => route.component === FriendsScreen).name,
    });
  }, [setHomeOptions]));

  const onSearch = (searchTerm) => {
    const matchingValues = completeFriendsList.filter(deck => deck.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? [];
    setFriendsList(matchingValues);
  }

  const onRemoveFriend = async (friend) => {
    await removeFriend(currentUser.id, friend.id); // todo implement snackbar/banner feedback

    // permenantly remove friend from list
    const friends = [ ...friendsList ];
    friends.splice(friends.findIndex(user => user.id === friend.id), 1);

    setCompleteFriendsList(friends);
    setFriendsList(friends);
  }

  const goToAddFriends = () => navigation.push('Add a Friend')

  return (
    <Screen>
      <View style={styles.buttonWrapper}>
        <Button onPress={goToAddFriends} title="Add a friend!" />
      </View>
      <Search onSearch={onSearch} />
      <ScrollView style={styles.friendsContainer}>
        <View style={styles.friendsWrapper}>
          {friendsList.length > 0 ? friendsList.map(user => (
            <View style={styles.friendSummary} key={user.id}>
              <Text>
                {user.name}
              </Text>
              <Text>
                {user.email}
              </Text>
              <Button onPress={() => onRemoveFriend(user)} title="-"/>
            </View>
          )) : <Text>No friends yet! Try adding some using the button above</Text>}
        </View>
      </ScrollView>
    </Screen>
  );
}

FriendsScreen.propTypes = {
  setHomeOptions: PropTypes.func.isRequired
}

export default FriendsScreen;
