import React, { useLayoutEffect } from 'react';
import Screen from '../../components/Screen';
import Deck from '../../components/Deck/Deck';

const DeckScreen = ({
  navigation,
  route: {
    params: {
      id, name, logo, shortDesc
    }
  }
}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation, name]);

  return (
    <Screen>
      <Deck 
        onPress={() => {}} // todo
        name={name}
        logo={logo} 
        shortDesc={shortDesc}
      />
    </Screen>
  );
};

export default DeckScreen;
