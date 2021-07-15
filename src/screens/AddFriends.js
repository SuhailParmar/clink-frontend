import React, { useState, useCallback, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { addFriend, getFriends, getUsers } from '../utils/http';
import UserContext from '../contexts/UserContext';
import elements from '../theming/elements';
import Button from '../components/Button.js';
import Screen from '../components/Screen.js';
import Search from '../components/Search.js';

const styles = StyleSheet.create({
  friendsContainer: {},
  friendsWrapper: {
    margin: 20,
    marginTop: 0,
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
    // boxShadow: '0 4px 5px rgba(0, 0, 0, 0.2)'
  },
});

const AddFriendsScreen = () => {
  const [completeUsersList, setCompleteUsersList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const currentUser = useContext(UserContext);
  
  useFocusEffect(useCallback(() => {
    const getUsers_ = async () => {
      try {
        const [users, friendsIds] = await Promise.all([getUsers(), getFriends(currentUser.id)]);
        // filter out self, and users already on friendslist
        const filteredUsers = users.filter(user => user.id !== currentUser.id && !friendsIds.includes(user.id));
        setCompleteUsersList(filteredUsers);
        setUsersList(filteredUsers);
      } catch (e) {
        console.error(e);
      }
    };
    getUsers_();
  }, []));

  const onSearch = (searchTerm) => {
    const matchingValues = completeUsersList.filter(deck => deck.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? [];
    setUsersList(matchingValues);
  }

  const onAddFriend = async (friend) => {
    await addFriend(currentUser.id, friend.id); // todo implement snackbar/banner feedback

    // permenantly remove user from list
    const users = [ ...usersList ];
    users.splice(users.findIndex(user => user.id === friend.id), 1);

    setCompleteUsersList(users);
    setUsersList(users);
  }

  return (
    <Screen>
      <Search onSearch={onSearch} />
      <ScrollView style={styles.friendsContainer}>
        <View style={styles.friendsWrapper}>
          {usersList.map(user => (
            <View style={styles.friendSummary} key={user.id}>
              <Text>
                {user.name}
              </Text>
              <Text>
                {user.email}
              </Text>
              <Button onPress={() => onAddFriend(user)} title="+"/>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

export default AddFriendsScreen;
