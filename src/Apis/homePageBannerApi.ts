import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homePageBannerApi = createApi({
  reducerPath: "homePageBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["HomePageBanners"],
  endpoints: (builder) => ({
    getHomePageBanners: builder.query({
      query: () => ({
        url: "homePageBanner/0",
      }),
      providesTags: ["HomePageBanners"],
    }),
  }),
});

export const {
  useGetHomePageBannersQuery,
} = homePageBannerApi;
export default homePageBannerApi;
