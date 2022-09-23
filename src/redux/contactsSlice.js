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
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({
        url: '/contacts',
        method: 'GET',
      }),
      providesTags: ['Contacts'],
    }),
    addContacts: builder.mutation({
      query: newContact => ({
        url: '/contacts',
        method: 'POST',
        data: newContact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContacts: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    updateContacts: builder.mutation({
      query: ({ id, user }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
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
