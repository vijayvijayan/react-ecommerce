import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const articleNewApi = createApi({
  reducerPath: "articleNewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, api) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.append("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  tagTypes: ["ArticleNew"], // Global tag for cache invalidation
  endpoints: (builder) => ({
    // Fetch all articles
    getArticleNew: builder.query({
      query: () => ({
        url: "articleNew",
      }),
      providesTags: ["ArticleNew"], // Can be used to invalidate cache globally
    }),

    // Fetch article by ID
    getArticleNewById: builder.query({
      query: (id) => ({
        url: `articleNew/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "ArticleNew", id }], // Use dynamic tag
    }),

    // Fetch article by menuId
    getArticleNewByMenuId: builder.query({
      query: (id) => ({
        url: `articleNew/menuId/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "ArticleNew", id }], // Use dynamic tag
    }),
     // Fetch article by template
    getArticleNewByTemplate: builder.query({
      query: (template) => ({
        url: `articleNew/template/${template}`,
      }),
      providesTags: (result, error, template) => [{ type: "ArticleNew", template }], // Use dynamic tag
    }),
  }),
});

export const {
  useGetArticleNewQuery,
  useGetArticleNewByIdQuery,
  useGetArticleNewByMenuIdQuery,
  useGetArticleNewByTemplateQuery,
} = articleNewApi;

export default articleNewApi;
