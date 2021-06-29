import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Screen from '../components/Screen';
import Button from '../components/Button';
import { getDeck, getUser } from '../utils/http';

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

  useEffect(() => {
    const getDeck_ = async () => {
      try {
        setLoading(true);
        const response = await getDeck(id);
        setDeck(response);
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
          <Image source={require(`../../assets/${deck.logo}`)} style={styles.img} />
          <Text style={styles.description}>{deck.shortDesc}</Text>
          <Text style={styles.description}>Author: {author.name}</Text>
          {/* 
            todo redirect to the Friends tab instead of profile
            todo redirect to Profile if author === self OR hide button (requires user context to be set up)
           */}
          <Button
            title="View author's profile"
            onPress={() => navigation.push('Profile', { userId: author.id })}
            style={styles.button}
          />
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
