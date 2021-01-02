import axios from 'axios';
import isProd from '../environments';

const baseUrl = isProd ? '' : 'localhost:5001';
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
    return axios.get(`${baseUrl}/${decks}`);
}
const createDeck = () => {
    return axios.post(`${baseUrl}/${decks}`);
}
const getDeck = (id) => {
    return axios.get(`${baseUrl}/${decks}/${id}`);
}
const updateDeck = (id) => {
    return axios.put(`${baseUrl}/${decks}/${id}`);
}
const deleteDeck = (id) => {
    return axios.delete(`${baseUrl}/${decks}/${id}`);
}
//#endregion

//#region User
const createUser = () => {
    return axios.post(`${baseUrl}/${user}`);
}
const getUser = (id) => {
    return axios.get(`${baseUrl}/${user}/${id}`);
}
const updateUser = (id) => {
    return axios.put(`${baseUrl}/${user}/${id}`);
}
const deleteUser = (id) => {
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