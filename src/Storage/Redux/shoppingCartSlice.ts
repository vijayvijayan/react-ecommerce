 import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../Interface";

export interface ShoppingCartState {
    cartItems: shoppingCartModel[];
}

 const initialStateCart: ShoppingCartState = {
  cartItems: [],
};

 export const shoppingCartSlice=createSlice({
    name:"cartItems",
    initialState:initialStateCart,
    reducers:{
        // setShoppingCart:(state,action)=>{
        //     state.cartItems=action.payload;
        // },
        setShoppingCart: (
            state,
            action: PayloadAction<shoppingCartModel>
          ) => {
            const existingItem = state.cartItems.find(
              item => item.productId === action.payload.productId
            );

            if (existingItem) {
              existingItem.count =
                (existingItem.count ?? 0) + (action.payload.count ?? 1);
            } else {
              state.cartItems.push(action.payload);
            }
          },
           clearCart: (state) => {
              state.cartItems = [];
            },
        updateQuantity:(state,action)=>{
            //payload - cart item needs to be updated, newquantity
            state.cartItems=state.cartItems?.map((item)=>{
                if(item.productId===action.payload.cartItem.productId)
                {
                    item.count=action.payload.count;
                }
                return item;
            });
        },
        removeFromCart:(state,action)=>{
            //payload - cart item needs to be updated, newquantity
            state.cartItems=state.cartItems?.filter((item)=>{
                if(item.productId===action.payload)
                {
                   return null;
                }
                return item;
            });
        },
    },
 });

 export const {setShoppingCart,updateQuantity,removeFromCart,clearCart}=shoppingCartSlice.actions;
 export const shoppingCartReducer=shoppingCartSlice.reducer;