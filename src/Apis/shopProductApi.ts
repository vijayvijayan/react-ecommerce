import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shopProductApi = createApi({
  reducerPath: "shopProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/",
    prepareHeaders: (headers, api) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.append("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  tagTypes: ["shopProduct"], // Global tag for cache invalidation
  endpoints: (builder) => ({
    // Fetch all shopProduct
    getshopProduct: builder.query({
      query: ({count,subCategoryId}:{count:number,subCategoryId:any}) => ({
        url: `shopproduct/${count}/${subCategoryId}`,
      }),
      providesTags: (result, error, {count,subCategoryId}) => [{ type: "shopProduct",id: `${count}-${subCategoryId}` }], // Use dynamic tag
    }),
     // Fetch all shopProduct by id
     getshopProductById: builder.query({
      query: (id) => ({
        url: `shopProduct/id/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "shopProduct", id }], // Use dynamic tag
    }),
   
      getShopCategories: builder.query({
      query: () => ({
        url: "shopcategory/0",
      }),
      providesTags: ["shopProduct"],
    }),
     getShopSubCategories: builder.query({
      query: () => ({
        url: "subcategories/active/0",
      }),
      providesTags: ["shopProduct"],
    }), 

     shopProductRatingInsert: builder.mutation<any, any>({
      query: (shopProductRatingData) => ({
        url: "shopproduct/shopProductRatingInsert",
        method: "POST",
        body: shopProductRatingData,
      }),
      invalidatesTags: ["shopProduct"],
    }),
 getShopProductRatingByProductId:builder.query({
      query:(shopProductId)=>({
           url:`shopproduct/getShopProductRatingById/${shopProductId}`,
      }),
      providesTags:["shopProduct"]
  }),

  }),
});

export const {
  useShopProductRatingInsertMutation,
  useGetShopProductRatingByProductIdQuery,
  useGetshopProductQuery,
  useGetshopProductByIdQuery,
  useGetShopCategoriesQuery,
  useGetShopSubCategoriesQuery,
} = shopProductApi;

export default shopProductApi;
