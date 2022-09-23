import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosContacts, addToken, removeToken } from 'services/axiosInstance';

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (newUser, thunkAPI) => {
    try {
      const { data } = await axiosContacts.post('/users/signup', newUser);
      addToken(data.token);
      return data;
    } catch (error) {
      console.log({
        error,
      });
      return thunkAPI.rejectWithValue({
        message: error.message,
        name: error.response?.data?.errors?.name?.message ?? null,
        email: error.response?.data?.errors?.email?.message ?? null,
        password: error.response?.data?.errors?.password?.message ?? null,
      });
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
      const { data } = await axiosContacts.get('/users/current');
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
