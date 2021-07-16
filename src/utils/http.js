import axios from 'axios';
import { mockDecks as initialDecks, mockUsers as initialUsers } from './mockData';
import isProd, { mockBackend } from '../environments';

// todo
let axios_instance = require('axios').default;
const baseUrl = isProd ? '' : 'https://localhost:5001/';
let headers = {
  // 'Access-Control-Allow-Origin': '*'
};
// todo let { mockDecks, mockUsers } = mockBackend && await import('./mockData');

// keep mockData in memory
let mockDecks = initialDecks;
let mockUsers = initialUsers;

//endpoints
const endpoint_decks = 'decks';
const endpoint_deck = 'decks/deck';
const endpoint_users = 'users';
const endpoint_user = 'users/user';
const endpoint_friends = 'friends';
const endpoint_lobby = 'lobby';

const setId = async (id) => {
  headers = {...headers, id_token: id};

  // Create new instance of axios with the new headers
  axios_instance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
    headers: headers
  });
}

//#region Decks
const getDecks = (userId) => {
  if (mockBackend) {
    // todo fix mockBackend
    if(!ids) return mockDecks;
    return mockDecks.filter(deck => ids.includes(deck.id))
  }
  return axios_instance.get(`${endpoint_decks}/${userId || ''}`);
}
const createDeck = (deck) => {
  if (mockBackend) {
    mockDecks.push(deck);
    return;
  }
  return axios_instance.post(endpoint_deck, deck);
}
const getDeck = (id) => {
  if (mockBackend) return mockDecks.find(deck => deck.id === id);
  return axios_instance.get(`${endpoint_deck}/${id}`);
}
const updateDeck = (id, deck) => {
  if (mockBackend) return mockDecks[mockDecks.findIndex(deck => deck.id === id)] = deck;
  return axios_instance.put(`${endpoint_deck}/${id}`, deck);
}
const deleteDeck = (id) => {
  if (mockBackend) {
    mockDecks.splice(mockDecks.findIndex(deck => deck.id === id), 1);
    return;
  }
  return axios_instance.delete(`${endpoint_deck}/${id}`);
}
//#endregion

//#region Lobby
const createLobby = () => {
  if (mockBackend) throw new Error('Mock lobby not implemented');
  return axios_instance.post(endpoint_lobby);
}
const getLobby = (phrase) => {
  if (mockBackend) throw new Error('Mock lobby not implemented');
  return axios_instance.get(`${endpoint_lobby}${phrase && `/${phrase}`}`);
}
//#endregion

//#region User
const getUsers = (ids) => {
  if (mockBackend) {
    if (ids) return mockUsers.filter(user => ids.includes(user.id));
    return mockUsers;
  }
  return axios_instance.get(`${endpoint_users}${ids === undefined ? '' : `/ids?=${JSON.stringify(ids)}`}`);
  // return axios_instance.get(`${endpoint_users}${ids && `/ids?=${JSON.stringify(ids)}`}`);
}
const createUser = (user) => {
  if (mockBackend) {
    mockUsers.push(user);
    return;
  }
  return axios_instance.post(endpoint_user, user);
}
const getUser = () => {
  if (mockBackend) return mockUsers.find(user => user.id === id);
  return axios_instance.get(endpoint_user);
}
const updateUser = (id, user) => {
  if (mockBackend) return mockUsers[mockUsers.findIndex(user => user.id === id)] = user;
  return axios_instance.put(`${endpoint_user}/${id}`, user);
}
const deleteUser = (id) => {
  if (mockBackend) {
    mockUsers.splice(mockUsers.findIndex(user => user.id === id), 1);
    return;
  }
  return axios_instance.delete(`${endpoint_user}/${id}`);
}
//#endregion

//#region Friends
const getFriends = (userId) => {
  if (mockBackend) return mockUsers.find(user => user.id === userId).friends;
  return axios_instance.get(`${endpoint_user}/${userId}/${endpoint_friends}`);
}
const addFriend = (userId, friendId) => {
  if (mockBackend) {
    mockUsers.find(user => user.id === userId).friends.push(friendId);
    return;
  }
  return axios_instance.post(`${endpoint_user}/${userId}/${endpoint_friends}/${friendId}`, endpoint_user);
}
const removeFriend = (userId, friendId) => {
  if (mockBackend) {
    const friendsList = mockUsers.find(user => user.id === userId).friends;
    mockUsers.find(user => user.id === userId).friends.splice(friendsList.findIndex(user => user.id === friendId), 1);
    return;
  }
  return axios_instance.delete(`${endpoint_user}/${userId}/${endpoint_friends}/${friendId}`);
}
//#endregion

export {
  setId,
  getDecks,
  createDeck,
  getDeck,
  updateDeck,
  deleteDeck,
  createLobby,
  getLobby,
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getFriends,
  addFriend,
  removeFriend,
}