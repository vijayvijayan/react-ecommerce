import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const photoGalleryApi = createApi({
  reducerPath: "photoGalleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["PhotoGallerys"],
  endpoints: (builder) => ({
    getPhotoGallery: builder.query({
      query: () => ({
        url: "photoGallery",
      }),
      providesTags: ["PhotoGallerys"],
    }),
    getPhotoGalleryById: builder.query({
        query: ({galleryTypeId,galleryType}) => ({
          url: `photoGallery/${galleryTypeId}/${galleryType}`,
        }),
        providesTags: ["PhotoGallerys"],
      }),
  }),
});

export const {
  useGetPhotoGalleryQuery,useGetPhotoGalleryByIdQuery,
} = photoGalleryApi;
export default photoGalleryApi;
