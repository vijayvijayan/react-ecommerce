import { createSlice } from "@reduxjs/toolkit";

const initialState={
 shopProductItem:[],
};

export const shopProductSlice=createSlice({
   name:"ShopProduct",
   initialState:initialState,
   reducers:{
    setShopProduct:(state,action)=>{
           state.shopProductItem=action.payload;
       },
   },
});

export const {setShopProduct}=shopProductSlice.actions;
export const shopProductReducer=shopProductSlice.reducer;