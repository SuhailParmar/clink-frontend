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
  }
  return axios.delete(`${baseUrl}/${decks}/${id}`);
}
//#endregion

//#region User
const createUser = () => {
  if (mockBackend) throw new Error('Mock users not implemented');
  return axios.post(`${baseUrl}/${user}`);
}
const getUser = (id) => {
  if (mockBackend) throw new Error('Mock users not implemented');
  return axios.get(`${baseUrl}/${user}/${id}`);
}
const updateUser = (id, user) => {
  if (mockBackend) throw new Error('Mock users not implemented');
  return axios.put(`${baseUrl}/${user}/${id}`, user);
}
const deleteUser = (id) => {
  if (mockBackend) throw new Error('Mock users not implemented');
  return axios.delete(`${baseUrl}/${user}/${id}`);
}
//#endregion

//#region Lobby
const createLobby = () => {
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
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createLobby
}