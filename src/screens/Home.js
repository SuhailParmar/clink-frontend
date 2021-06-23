import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { tabRoutes } from '../routes';
import colours from '../theming/colours';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <Tab.Navigator
      initialRouteName='Decks'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Decks') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: colours.primary.normal,
        inactiveTintColor: 'gray',
      }}
    >
      {tabRoutes.map(r => (
        <Tab.Screen 
          name={r.name} 
          key={r.name} 
          component={r.component}
          options={r?.options} />
      ))}
    </Tab.Navigator>
  );
}

export default App;
