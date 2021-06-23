import DeckScreen from './screens/Deck/Deck';
import DecksScreen from './screens/Decks/Decks';
import FriendsScreen from './screens/Friends/Friends';
import HomeScreen from './screens/Home/Home';
import LobbyScreen from './screens/Lobby/Lobby';
import LoginScreen from './screens/Login/Login';
import LogoutScreen from './screens/Logout/Logout';
import OwnProfileScreen from './screens/OwnProfile/OwnProfile';
import SignUpScreen from './screens/SignUp/SignUp';

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
