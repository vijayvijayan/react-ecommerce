import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { shoppingCartModel,shopProductModel } from "../Interface";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (cartData) => ({
        url: "cart/GetCart",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: cartData,
      }),
    }),
  }),
});

export const { useGetCartQuery } = shoppingCartApi;
export default shoppingCartApi;
