import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),

  tagTypes: ["ContactUs"],
  endpoints: (builder) => ({
   
    createContact: builder.mutation({
      query: (data) => ({
        url: "contactus/contactusInsert",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContactUs"],
    }),
    
  }),

});

export const {
  useCreateContactMutation
} = contactApi;
export default contactApi;
