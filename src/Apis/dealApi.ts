import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dealApi = createApi({
  reducerPath: "dealApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Deal"],

  endpoints: (builder) => ({
     getDeal: builder.query({
      query: (dealId) => ({
        url: `ShopProduct/deals/${dealId}`,
      }),
      providesTags: ["Deal"],
    }), 
   
  }),
});

export const {
  useGetDealQuery
} = dealApi;

export default dealApi;
