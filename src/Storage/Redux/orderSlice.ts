import { createSlice } from "@reduxjs/toolkit";

const initialState={
 orderItem:[],
};

export const orderSlice=createSlice({
   name:"Order",
   initialState:initialState,
   reducers:{
    setOrder:(state,action)=>{
           state.orderItem=action.payload;
       },
   },
});

export const {setOrder}=orderSlice.actions;
export const orderReducer=orderSlice.reducer;