import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type BlogPaginationParams = {
  blogTypeId: number;
  page: number;
  pageSize: number;
};

export const blogApi = createApi({
  reducerPath: "blogApi",

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

  tagTypes: ["Blog"],

  endpoints: (builder) => ({

    blogInsert: builder.mutation<any, any>({
      query: (blogData) => ({
        url: "blog/blogInsert",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["Blog"],
    }),

     blogCommentInsert: builder.mutation<any, any>({
      query: (blogData) => ({
        url: "blog/blogCommentInsert",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["Blog"],
    }),

//     blogDelete: builder.mutation<void, number>({
//   query: (blogId) => ({
//     url: `blog/deleteblogitem/${blogId}`,
//     method: "DELETE",
//   }),
//   invalidatesTags: (result, error, blogId) => [
//     { type: "Blog", id: blogId },
//     { type: "Blog", id: "LIST" }, // optional but recommended
//   ],
// }),

 blogDelete: builder.mutation({
      query: (blogId) => ({
        url: "blog/deleteblogitem/" + blogId,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),


    getBlogByBlogTypeId: builder.query<any, number>({
      query: (blogId) => `blog/GetBlogItem/${blogId}`,
      providesTags: (result, error, blogId) => [
        { type: "Blog", id: blogId },
      ],
    }),

    getBlogByUserId: builder.query<any, string>({
      query: (userId) => `blog/GetBlogList/${userId}`,
      providesTags: (result, error, userId) => [
        { type: "Blog", id: userId },
      ],
    }),
    getBlogItemByBlogId: builder.query({
      query: (blogId) => `blog/GetBlogItem/${blogId}`,
      providesTags: (result, error, blogId) => [
        { type: "Blog", id: blogId },
      ],
    }),
      getBlogItemWithNextPrev: builder.query({
      query: (blogId) => `blog/GetBlogItemWithNextPrev/${blogId}`,
      providesTags: (result, error, blogId) => [
        { type: "Blog", id: blogId },
      ],
    }),

    getBlogPagination: builder.query<any, BlogPaginationParams>({
    query: ({ blogTypeId, page, pageSize }) => ({
        url: `blog/${blogTypeId}/${page}/${pageSize}`,
    }),
    providesTags: ["Blog"],
    }),

    getBlogType: builder.query({
      query: () => ({
        url: "blog/GetBlogTypeList",
      }),
      providesTags: ["Blog"],
    }),
    getBlogCommentsUsingParentId:builder.query({
      query:({parentId,blogId})=>({
           url:`blog/getBlogCommentsUsingParentId/${parentId}/${blogId}`,
      }),
      providesTags:["Blog"]
  }),

  }),
});

export const {
  useBlogCommentInsertMutation,
  useBlogInsertMutation,
  useBlogDeleteMutation,
  useGetBlogByUserIdQuery,
  useGetBlogTypeQuery,
  useGetBlogItemByBlogIdQuery,
  useGetBlogPaginationQuery,
  useGetBlogByBlogTypeIdQuery,
   useGetBlogCommentsUsingParentIdQuery,
  useLazyGetBlogCommentsUsingParentIdQuery,
  useGetBlogItemWithNextPrevQuery
} = blogApi;

export default blogApi;
