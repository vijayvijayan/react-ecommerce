import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/",
    prepareHeaders: (headers, api) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.append("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  tagTypes: ["Menu"], // Global tag for cache invalidation
  endpoints: (builder) => ({
    // Fetch all menus
    getMenu: builder.query({
      query: () => ({
        url: "menu",
      }),
      providesTags: ["Menu"], // Can be used to invalidate cache globally
    }),
  }),
});

export const {
  useGetMenuQuery,
} = menuApi;

export default menuApi;
