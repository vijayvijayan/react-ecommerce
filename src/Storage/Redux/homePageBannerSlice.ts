import { createSlice } from "@reduxjs/toolkit";

const initialState={
 homePageBannerItem:[],
};

export const homePageBannerSlice=createSlice({
   name:"HomePageBanner",
   initialState:initialState,
   reducers:{
    setHomePageBanner:(state,action)=>{
           state.homePageBannerItem=action.payload;
       },
   },
});

export const {setHomePageBanner}=homePageBannerSlice.actions;
export const homePageBannerReducer=homePageBannerSlice.reducer;