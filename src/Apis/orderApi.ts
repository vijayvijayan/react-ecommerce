import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Order"],

  endpoints: (builder) => ({
    orderInsert: builder.mutation<any, any>({
      query: (orderData) => ({
        url: "order/orderInsert",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    getOrderByOrderId: builder.query<any, number>({
      query: (orderId) => `order/${orderId}`,
      providesTags: (result, error, orderId) => [
        { type: "Order", id: orderId },
      ],
    }),
     getTrackingResult:builder.query({
      query:({orderId,emailId})=>({
           url:`order/tracking/${orderId}/${emailId}`,
      }),
      providesTags:["Order"]
  }),
  }),
});

export const {
  useOrderInsertMutation,
  useGetOrderByOrderIdQuery,
  useLazyGetTrackingResultQuery
} = orderApi;

export default orderApi;
