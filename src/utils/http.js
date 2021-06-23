// todo import axios from 'axios';
import { mockDecks, mockUsers } from './mockData';
import isProd, { mockBackend } from '../environments';

// todo
let axios = {};
const baseUrl = isProd ? '' : 'localhost:5001';
// todo let { mockDecks, mockUsers } = mockBackend && await import('./mockData');

//endpoints
const decks = 'Decks';
const user = 'User';
const users = 'Users';
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
    delete mockDecks[mockDecks.findIndex(deck => deck.id === id)];
    return;
  }
  return axios.delete(`${baseUrl}/${decks}/${id}`);
}
//#endregion

//#region User
const getUsers = () => {
  if (mockBackend) return mockUsers;
  return axios.get(`${baseUrl}/${users}`);
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
    delete mockUsers[mockUsers.findIndex(user => user.id === id)];
    return;
  }
  return axios.delete(`${baseUrl}/${user}/${id}`);
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
  createLobby
}