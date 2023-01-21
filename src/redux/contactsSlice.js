import { createApi } from '@reduxjs/toolkit/query/react';
// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import { axiosContacts } from 'services/axiosInstance';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data }) => {
    try {
      const result = await axiosContacts({
        url: baseUrl + url,
        method,
        data,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: axiosBaseQuery({
    // baseUrl: 'http://localhost:5000',
    baseUrl: 'https://phonebook-rest-api.vercel.app',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({
        url: '/api/contacts',
        method: 'GET',
      }),
      providesTags: ['Contacts'],
    }),
    addContacts: builder.mutation({
      query: newContact => ({
        url: '/api/contacts',
        method: 'POST',
        data: newContact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContacts: builder.mutation({
      query: id => ({
        url: `/api/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    updateContacts: builder.mutation({
      query: ({ id, user }) => ({
        url: `/api/contacts/${id}`,
        method: 'PUT',
        data: user,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
  useUpdateContactsMutation,
} = contactsApi;

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  },
});
export const { changeFilter } = filterSlice.actions;
export const filterReduser = filterSlice.reducer;
