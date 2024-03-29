import { createSlice } from '@reduxjs/toolkit';
import {
  signupThunk,
  loginThunk,
  logoutThunk,
  refreshThunk,
  verifyThunk,
} from './authThunk';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  isVerify: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    // sign up
    [signupThunk.pending]: store => {
      store.user = initialState.user;
      store.token = null;
      store.error = null;
      store.isLoggedIn = false;
      store.isVerify = false;
      store.loading = true;
    },
    [signupThunk.fulfilled]: (store, action) => {
      store.loading = false;
      store.user = action.payload.user;
      store.token = action.payload.token;
      store.isLoggedIn = true;
    },
    [signupThunk.rejected]: (store, action) => {
      store.loading = false;
      store.error = action.payload;
    },
    // verify token
    [verifyThunk.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [verifyThunk.fulfilled]: (store, action) => {
      store.loading = false;
      store.isVerify = true;
    },
    [verifyThunk.rejected]: (store, action) => {
      store.loading = false;
      // store.error = action.payload;
    },
    // login
    [loginThunk.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [loginThunk.fulfilled]: (store, action) => {
      store.loading = false;
      store.user = action.payload.user;
      store.token = action.payload.token;
      store.isLoggedIn = true;
      store.isVerify = true;
    },
    [loginThunk.rejected]: (store, action) => {
      store.loading = false;
      store.error = action.payload;
    },
    // logout
    [logoutThunk.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [logoutThunk.fulfilled]: store => {
      return initialState;
    },
    [logoutThunk.rejected]: (store, action) => {
      store.loading = false;
      store.error = action.payload;
    },
    // refresh
    [refreshThunk.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [refreshThunk.fulfilled]: (store, action) => {
      store.loading = false;
      store.user = action.payload;
      store.isLoggedIn = true;
      store.isVerify = true;
    },
    [refreshThunk.rejected]: (store, action) => {
      store.loading = false;
      store.error = action.payload;
      store.token = null;
    },
  },
});
export const authReducer = authSlice.reducer;
