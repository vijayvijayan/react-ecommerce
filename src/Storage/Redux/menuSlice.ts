import { createSlice } from "@reduxjs/toolkit";

const initialState={
 menuItem:[],
};

export const menuSlice=createSlice({
   name:"Menu",
   initialState:initialState,
   reducers:{
    setMenu:(state,action)=>{
           state.menuItem=action.payload;
       },
   },
});

export const {setMenu}=menuSlice.actions;
export const menuReducer=menuSlice.reducer;