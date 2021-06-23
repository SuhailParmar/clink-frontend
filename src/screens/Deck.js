import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Screen from '../components/Screen';
import { getDeck } from '../utils/http';

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

  useEffect(() => {
    const getDeck_ = async () => {
      try {
        const response = await getDeck(id);
        setDeck(response);
        setLoading(false);
      } catch(e) {
        console.warn(e);
      }
    };
    getDeck_();
  }, []);

  useLayoutEffect(() => {
    if(!deck.name) return;
    navigation.setOptions({
      title: deck.name,
    });
  }, [navigation, deck]);

  return (
    <Screen>
      {loading 
        ? <View className='loading'/>
        : deck && <View>
            <img src={deck.logo} className="card-img-top" alt=""></img>
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <p className="card-text">{deck.shortDesc}</p>
            </div>
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
