import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import { getUser } from './utils/http'
import UserContext from './contexts/UserContext';
import colours from './theming/colours';

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser_ = async () => {
      try {
        const user = await getUser('2'); // todo remove hard-coding when login is implemented; local storage equiv?
        setUser(user);
      } catch (e) {
        console.error(e); // todo will need to retry and/or display error message
      }
    };
    getUser_();
  }, []);

  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
  );
}

export default App;
