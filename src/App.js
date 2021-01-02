import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Lobby from './containers/Lobby/Lobby';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Decks from './containers/Decks/Decks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const routes = [
    {
      endpoint: '/decks',
      name: 'Decks',
      component: <Decks />
    },
    {
      endpoint: '/lobby/:id',
      name: 'Lobby',
      component: <Lobby />
    },
    {
      endpoint: '/sign-up',
      name: 'Sign Up',
      component: <SignUp />
    },
    {
      endpoint: '/login',
      name: 'Log In',
      component: <Login />
    },
    {
      endpoint: '/logout',
      name: 'Log Out',
      component: <Logout />
    },
  ]

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navigation routes={routes}/>
        </header>
        <main className="App-main">
          <Switch>
            {routes.map(r => <Route path={r.endpoint} key={r.endpoint}>{r.component}</Route>)}
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
