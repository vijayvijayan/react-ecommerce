import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const subscribeApi = createApi({
  reducerPath: "subscribeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes:["Subscribe"],
  endpoints: (builder) => ({
    createSubscribe: builder.mutation({
      query: (contactDetails) => ({
        url: "Subscription",
        method: "POST",
       header:{
        "Content-type":"application/json"
       },
       body:contactDetails,
      }),
      invalidatesTags:["Subscribe"],
    }),
  }),
});

export const { useCreateSubscribeMutation } = subscribeApi;
export default subscribeApi;
