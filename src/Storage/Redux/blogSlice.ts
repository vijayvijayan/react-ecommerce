import { createSlice } from "@reduxjs/toolkit";

const initialState={
 blogItem:[],
};

export const blogSlice=createSlice({
   name:"Blog",
   initialState:initialState,
   reducers:{
    setBlog:(state,action)=>{
           state.blogItem=action.payload;
       },
   },
});

export const {setBlog}=blogSlice.actions;
export const blogReducer =blogSlice.reducer;