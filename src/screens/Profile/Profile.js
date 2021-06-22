import * as React from 'react';
import { Text } from 'react-native';

export default function ProfileScreen() {
  const isSelf = true;
  const currentUser = 'Your user name here';
  const otherUser = 'Someone else\'s user name here';

  return (
    <Screen>
      <Text>Profile Screen</Text>
      <Text>{isSelf ? currentUser : otherUser}</Text>
    </Screen>
  );
}
