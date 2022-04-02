import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        currentUser: null,
        fetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.fetching = true;
        },
        loginSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.fetching = false;
        },
        loginFail: (state) => {
            state.fetching = false;
            state.error = true
        },
        logOutSuccess:(state) => {
            state.currentUser= null
        },
        setError:(state) => {
            state.error = false
        }
    }
})

export const {loginFail, loginStart, loginSuccess, logOutSuccess,setError} = userSlice.actions;
export default userSlice.reducer;