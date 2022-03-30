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
        }
    }
})

export const {loginFail, loginStart, loginSuccess} = userSlice.actions;
export default userSlice.reducer;