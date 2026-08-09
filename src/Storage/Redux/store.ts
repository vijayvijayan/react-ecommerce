import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import homePageBannerApi from "../../Apis/homePageBannerApi";
import { homePageBannerReducer } from "./homePageBannerSlice";
import menuApi from "../../Apis/menuApi";
import { menuReducer } from "./menuSlice";
import shopProductApi from "../../Apis/shopProductApi";
import { shopProductReducer } from "./shopProductSlice";
import { photoGalleryReducer } from "./photoGallerySlice";
import photoGalleryApi from "../../Apis/photoGalleryApi";
import { articleNewReducer } from "./articleNewSlice";
import articleNewApi from "../../Apis/articleNewApi";
import { userAuthReducer } from "./userAuth";
import authApi from "../../Apis/authApi";
import { shoppingCartReducer } from "./shoppingCartSlice";
import shoppingCartApi from "../../Apis/shoppingCartApi";
import orderApi from "../../Apis/orderApi";
import countryApi from "../../Apis/countryApi";
import { orderReducer } from "./orderSlice";
import blogApi from "../../Apis/blogApi";
import { blogReducer } from "./blogSlice";
import dealApi from "../../Apis/dealApi";


const store=configureStore({
    reducer:{
      shoppingCartStore:shoppingCartReducer,
      [shoppingCartApi.reducerPath]:shoppingCartApi.reducer,
      homePageBannerStore:homePageBannerReducer,
       [homePageBannerApi.reducerPath]:homePageBannerApi.reducer,
       menuStore:menuReducer,
       [menuApi.reducerPath]:menuApi.reducer,
        shopProductStore:shopProductReducer,
       [shopProductApi.reducerPath]:shopProductApi.reducer,
        photoGalleryStore:photoGalleryReducer,
       [photoGalleryApi.reducerPath]:photoGalleryApi.reducer,
         articleNewStore:articleNewReducer,
       [articleNewApi.reducerPath]:articleNewApi.reducer,
        userAuthStore:userAuthReducer,
       [authApi.reducerPath]:authApi.reducer,
       orderStore:orderReducer,
       [orderApi.reducerPath]:orderApi.reducer,
       [countryApi.reducerPath]:countryApi.reducer,
       [dealApi.reducerPath]:dealApi.reducer,
       blogStore:blogReducer,
       [blogApi.reducerPath]:blogApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
    .concat(homePageBannerApi.middleware)
   .concat(menuApi.middleware)
   .concat(shopProductApi.middleware)
   .concat(photoGalleryApi.middleware)
   .concat(articleNewApi.middleware)
   .concat(authApi.middleware)
   .concat(shoppingCartApi.middleware)
   .concat(orderApi.middleware)
   .concat(blogApi.middleware)
   .concat(countryApi.middleware)
   .concat(dealApi.middleware)
});

export type RootState=ReturnType<typeof store.getState>;
export default store;