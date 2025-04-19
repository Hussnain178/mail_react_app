import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
 

  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://104.236.100.170:8000', // Update with your backend base URL
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("csrf_token");
      if (token) {
        headers.set('Content-Type', 'application/json');
        headers.set('CSRF-Token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Company', 'Category', 'Subscription', 'Price'],
  endpoints: () => ({}),
});
