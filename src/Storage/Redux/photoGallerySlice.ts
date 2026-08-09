import { createSlice } from "@reduxjs/toolkit";

const initialState={
 photogalleryItem:[],
};

export const photogallerySlice=createSlice({
   name:"Photogallery",
   initialState:initialState,
   reducers:{
    setPhotogallery:(state,action)=>{
           state.photogalleryItem=action.payload;
       },
   },
});

export const {setPhotogallery}=photogallerySlice.actions;
export const photoGalleryReducer=photogallerySlice.reducer;