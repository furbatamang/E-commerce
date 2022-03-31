import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
        fetching:false,
        error: false,
        fetchedProducts:[]
    },
    reducers:{
        addProductStart:(state) => {
            state.fetching = true;
            state.error = false;
        },
        addProductSuccess: (state, action) => {
            state.fetching = false;
            state.quantity += action.payload.amount;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.amount;
        },
        addProductFailure: (state) => {
            state.fetching = false;
            state.error = false;
        },
        getProductStart:(state)=> {
            state.fetching = true;
            state.error = false;
        },
        getProductSuccess:(state,action) => {
            state.fetching = false;
            state.fetchedProducts.push(action.payload);
        },
        getProductFailure: (state) => {
            state.error = true;
            state.fetching = false;
        }
    },
});

export const {addProductStart, addProductFailure, addProductSuccess, getProductFailure, getProductStart, getProductSuccess} = cartSlice.actions;
export default cartSlice.reducer;