import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        fetching:false,
        error:false
    },
    reducers:{
        // get reducers
        getProductStart : (state) => {
            state.fetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action) => {
            state.fetching = false
            state.products = action.payload
        },
        getProductFailure : (state) => {
            state.fetching = false;
            state.error = true;
        },

        // Delete reducers

        deleteProductStart: (state) => {
            state.fetching = true;
            state.error = false;
        },

        deleteProductSuccess: (state, action) => {
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload),1
            )
        },
        deleteProductFailure : (state) => {
            state.fetching = false;
            state.error = true;
        },

        // Update products

        updateProductsStart:(state) => {
            state.fetching = true;
            state.error= false;
        },
        updateProductSuccess: (state, action) => {
            console.log(action.payload)
            state.fetching = false;
            state.products[state.products.findIndex(item => item._id === action.payload.id)] = action.payload.user;
            
        },
        updateProductFailure: (state) => {
            state.fetching = false;
            state.error = true;
        },
        // Adding new products
        
        addProductsStart:(state) => {
            state.fetching = true;
            state.error= false;
        },
        addProductSuccess: (state, action) => {
            state.fetching = false;
            state.products.push(action.payload)
        },
        addProductFailure: (state) => {
            state.fetching = false;
            state.error = true;
        },
    }
})

export const {
    getProductFailure, 
    getProductStart, 
    getProductSuccess, 
    deleteProductFailure, 
    deleteProductSuccess, 
    deleteProductStart,
    updateProductFailure,
    updateProductSuccess,
    updateProductsStart,
    addProductFailure,
    addProductSuccess,
    addProductsStart
} = productSlice.actions;
export default productSlice.reducer;