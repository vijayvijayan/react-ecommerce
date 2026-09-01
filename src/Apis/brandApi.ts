import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Brands"],
  endpoints: (builder) => ({

    getBrands: builder.query({
      query: () => ({
        url: "brand/GetBrandList",
      }),
      providesTags: ["Brands"],
    }),

  }),
});

export const {
  useGetBrandsQuery
} = brandApi;
export default brandApi;
