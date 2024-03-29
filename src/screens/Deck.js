import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Screen from '../components/Screen';
import Button from '../components/Button';
import { getDeck, getUser } from '../utils/http';
import UserContext from '../contexts/UserContext';

const styles = StyleSheet.create({
});

const DeckScreen = ({
  navigation,
  route: {
    params: {
      id
    }
  }
}) => {
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState({});
  const [author, setAuthor] = useState([]);
  const currentUser = useContext(UserContext);

  const isOwnDeck = currentUser?.id === author?.id;

  useEffect(() => {
    const getDeck_ = async () => {
      try {
        setLoading(true);
        const { data } = await getDeck(id);
        setDeck(data);
        setLoading(false);
      } catch(e) {
        console.error(e);
      }
    };
    getDeck_();
  }, []);

  useEffect(() => {
    if(!deck) return;
    const getUser_ = async () => {
      try {
        setLoading(true);
        const user = await getUser(deck.authorId);
        setAuthor(user);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getUser_();
  }, [deck]);

  useLayoutEffect(() => {
    if(!deck.name) return;
    navigation.setOptions({
      title: deck.name,
    });
  }, [navigation, deck]);

  return (
    <Screen>
      {loading 
        ? <View style={styles.loading}/>
        : deck && author && <View>
          <Text style={styles.title}>{deck.name}</Text>
          {/* todo fix image source android/web */}
          <Image source={{ uri: 'asset:/favicon.png' }} style={styles.img} />
          <Text style={styles.description}>{deck.description}</Text>
          <Text style={styles.description}>Author: {author.firstName}</Text>
          {/* 
            todo redirect to the Friends tab instead of profile
            todo redirect to Profile if author === self OR hide button (requires user context to be set up)
           */}
          {!isOwnDeck && <Button
            title="View author's profile"
            onPress={() => navigation.push('Profile', { userId: author.id })}
            style={styles.button}
          />}
        </View>
      }
    </Screen>
  );
};

DeckScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  route: PropTypes.any.isRequired,
}

export default DeckScreen;
