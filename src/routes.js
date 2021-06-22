import DeckScreen from './screens/Deck/Deck';
import DecksScreen from './screens/Decks/Decks';
import ProfileScreen from './screens/Profile/Profile';
import LobbyScreen from './screens/Lobby/Lobby';
import LoginScreen from './screens/Login/Login';
import LogoutScreen from './screens/Logout/Logout';
import SignUpScreen from './screens/SignUp/SignUp';

const routes = [
  {
    endpoint: '/profile',
    name: 'Profile',
    component: ProfileScreen
  },
  {
    endpoint: '/decks',
    name: 'Decks',
    component: DecksScreen
  },
  {
    endpoint: '/decks/:id',
    name: 'Deck',
    component: DeckScreen,
    // options: {({ route }) => ({ title: route.params.name })}
  },
  {
    endpoint: '/lobby/:id',
    name: 'Lobby',
    component: LobbyScreen
  },
  {
    endpoint: '/sign-up',
    name: 'Sign Up',
    component: SignUpScreen
  },
  {
    endpoint: '/login',
    name: 'Log In',
    component: LoginScreen
  },
  {
    endpoint: '/logout',
    name: 'Log Out',
    component: LogoutScreen
  },
];

export default routes;