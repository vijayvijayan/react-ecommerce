import { createSlice } from "@reduxjs/toolkit";

const initialState={
 articleNewItem:[],
};

export const articleNewSlice=createSlice({
   name:"ArticleNew",
   initialState:initialState,
   reducers:{
    setArticleNew:(state,action)=>{
           state.articleNewItem=action.payload;
       },
   },
});

export const {setArticleNew}=articleNewSlice.actions;
export const articleNewReducer=articleNewSlice.reducer;