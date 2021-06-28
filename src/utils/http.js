// todo import axios from 'axios';
import { mockDecks as initialDecks, mockUsers as initialUsers } from './mockData';
import isProd, { mockBackend } from '../environments';

// todo
let axios = {};
const baseUrl = isProd ? '' : 'localhost:5001';
// todo let { mockDecks, mockUsers } = mockBackend && await import('./mockData');

// keep mockData in memory
let mockDecks = initialDecks;
let mockUsers = initialUsers;

//endpoints
const decks = 'Decks';
const user = 'User';
const users = 'Users';
const friends = 'Friends';
const lobby = 'Lobby';

//headers
const headers = {};

const setId = (id) => {
  //headers = {...headers, id_token: id};
}

//#region Decks
const getDecks = () => {
  if (mockBackend) return mockDecks;
  return axios.get(`${baseUrl}/${decks}`);
}
const createDeck = (deck) => {
  if (mockBackend) {
    mockDecks.push(deck);
    return;
  }
  return axios.post(`${baseUrl}/${decks}`, deck);
}
const getDeck = (id) => {
  if (mockBackend) return mockDecks.find(deck => deck.id === id);
  return axios.get(`${baseUrl}/${decks}/${id}`);
}
const updateDeck = (id, deck) => {
  if (mockBackend) return mockDecks[mockDecks.findIndex(deck => deck.id === id)] = deck;
  return axios.put(`${baseUrl}/${decks}/${id}`, deck);
}
const deleteDeck = (id) => {
  if (mockBackend) {
    mockDecks.splice(mockDecks.findIndex(deck => deck.id === id), 1);
    return;
  }
  return axios.delete(`${baseUrl}/${decks}/${id}`);
}
//#endregion

//#region User
const getUsers = (ids) => {
  if (mockBackend) {
    if (ids) return mockUsers.filter(user => ids.includes(user.id));
    return mockUsers;
  }
  return axios.get(`${baseUrl}/${users}${ids ? `/ids?=${JSON.stringify(ids)}`: ''}`);
}
const createUser = (user) => {
  if (mockBackend) {
    mockUsers.push(user);
    return;
  }
  return axios.post(`${baseUrl}/${user}`, user);
}
const getUser = (id) => {
  if (mockBackend) return mockUsers.find(user => user.id === id);
  return axios.get(`${baseUrl}/${user}/${id}`);
}
const updateUser = (id, user) => {
  if (mockBackend) return mockUsers[mockUsers.findIndex(user => user.id === id)] = user;
  return axios.put(`${baseUrl}/${user}/${id}`, user);
}
const deleteUser = (id) => {
  if (mockBackend) {
    mockUsers.splice(mockUsers.findIndex(user => user.id === id), 1);
    return;
  }
  return axios.delete(`${baseUrl}/${user}/${id}`);
}
//#endregion

//#region Friends
const getFriends = (userId) => {
  if (mockBackend) return mockUsers.find(user => user.id === userId).friends;
  return axios.get(`${baseUrl}/${user}/${userId}/${friends}`);
}
const addFriend = (userId, friendId) => {
  if (mockBackend) {
    mockUsers.find(user => user.id === userId).friends.push(friendId);
    return;
  }
  return axios.post(`${baseUrl}/${user}/${userId}/${friends}/${friendId}`, user);
}
const removeFriend = (userId, friendId) => {
  if (mockBackend) {
    const friendsList = mockUsers.find(user => user.id === userId).friends;
    mockUsers.find(user => user.id === userId).friends.splice(friendsList.findIndex(user => user.id === friendId), 1);
    return;
  }
  return axios.delete(`${baseUrl}/${user}/${userId}/${friends}/${friendId}`);
}
//#endregion

//#region Lobby
const createLobby = () => {
  if (mockBackend) throw new Error('Mock lobby not implemented');
  return axios.post(`${baseUrl}/${lobby}`);
}
//#endregion

export {
  setId,
  getDecks,
  createDeck,
  getDeck,
  updateDeck,
  deleteDeck,
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getFriends,
  addFriend,
  removeFriend,
  createLobby
}