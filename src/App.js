import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import colours from './theming/colours';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: colours.primary.normal,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {routes.map(r => (
          <Stack.Screen 
            name={r.name} 
            key={r.name} 
            component={r.component}
            options={r?.options} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
