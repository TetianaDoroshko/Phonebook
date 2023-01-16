import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosContacts, addToken, removeToken } from 'services/axiosInstance';

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (newUser, thunkAPI) => {
    try {
      const { data } = await axiosContacts.post('/api/auth/signup', newUser);
      addToken(data.token);
      return data;
    } catch (error) {
      const err = { message: error.message };

      if (error.response?.data?.message.split(' ')[0] === '"name"') {
        err.name = error.response?.data?.message.split(' ').slice(1).join(' ');
      }
      if (error.response?.data?.message.split(' ')[0] === '"email"') {
        err.email = error.response?.data?.message.split(' ').slice(1).join(' ');
      }
      if (error.response?.data?.message.split(' ')[0] === '"password"') {
        err.password = error.response?.data?.message
          .split(' ')
          .slice(1)
          .join(' ');
      }

      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      const { data } = await axiosContacts.post('/users/login', user);
      addToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axiosContacts.post('/users/logout');
      removeToken(thunkAPI.getState().auth.token);
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;

    addToken(savedToken);
    try {
      const { data } = await axiosContacts.get('/api/auth/current');
      return data;
    } catch (error) {
      removeToken();
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const savedToken = thunkAPI.getState().auth.token;
      return Boolean(savedToken);
    },
  }
);
