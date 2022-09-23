import axios from 'axios';

export const axiosContacts = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
  // headers: { 'Content-Type': 'application/json' },
});

export const addToken = token => {
  axiosContacts.defaults.headers.common['Authorization'] = token;
};
export const removeToken = () => {
  axiosContacts.defaults.headers.common['Authorization'] = '';
};
