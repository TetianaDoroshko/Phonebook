import axios from 'axios';

export const axiosContacts = axios.create({
  baseURL: 'http://localhost:5000',
  // baseURL: 'https://phonebook-rest-api.vercel.app',
  // headers: { 'Content-Type': 'application/json' },
});

export const addToken = token => {
  axiosContacts.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export const removeToken = () => {
  axiosContacts.defaults.headers.common['Authorization'] = '';
};
