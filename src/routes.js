import DeckScreen from './screens/Deck';
import DecksScreen from './screens/Decks';
import FriendsScreen from './screens/Friends';
import HomeScreen from './screens/Home';
import LobbyScreen from './screens/Lobby';
import LoginScreen from './screens/Login';
import LogoutScreen from './screens/Logout';
import OwnProfileScreen from './screens/OwnProfile';
import SignUpScreen from './screens/SignUp';

const mainRoutes = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Deck',
    component: DeckScreen,
    // options: {({ route }) => ({ title: route.params.name })}
  },
  {
    name: 'Lobby',
    component: LobbyScreen
  },
  {
    name: 'Sign Up',
    component: SignUpScreen
  },
  {
    name: 'Log In',
    component: LoginScreen
  },
  {
    name: 'Log Out',
    component: LogoutScreen
  },
];

const tabRoutes = [
  {
    name: 'Decks',
    component: DecksScreen
  },
  {
    name: 'Profile',
    component: OwnProfileScreen,
    options: { isOwnProfile: true }
  },
  {
    name: 'Friends',
    component: FriendsScreen,
    options: { tabBarBadge: 3 }
  },
];

export default mainRoutes;
export {
  tabRoutes
};
