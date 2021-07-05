import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import routes, { unauthenticatedRoutes } from './routes';
import UserContext from './contexts/UserContext';
import colours from './theming/colours';

const Stack = createStackNavigator();

const componentWrapper = (Component, props) => (rest) => <Component {...props} {...rest} />;

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const updateUserContext = (user) => setUser(user);

  // switch stack completely, to prevent user from being able to go back to login screen
  const screens = (isAuthenticated ? routes : unauthenticatedRoutes).map(r => (
    <Stack.Screen 
      name={r.name} 
      key={r.name} 
      component={isAuthenticated ? r.component : componentWrapper(r.component, { login, updateUserContext })}
      options={r?.options} />
  ));

  const initialRouteName = isAuthenticated ? 'Home' : 'Log In';

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName={initialRouteName}
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
          {screens}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
