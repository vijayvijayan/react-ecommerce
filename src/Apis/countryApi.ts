import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const countryApi = createApi({
  reducerPath: "countryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Countries"],
  endpoints: (builder) => ({

    getCountries: builder.query({
      query: () => ({
        url: "country/GetCountries",
      }),
      providesTags: ["Countries"],
    }),

 getStatesByCountryId: builder.query({
      query: (id) => ({
        url: `country/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Countries", id }], // Use dynamic tag
    }),

  }),
});

export const {
  useGetCountriesQuery,
  useGetStatesByCountryIdQuery
} = countryApi;
export default countryApi;
