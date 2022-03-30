import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState:{
        currentUser: {},
        users:[],
        fetching:false,
        error:false
    },
    reducers:{
        loginStart: (state) => {
            state.fetching = true
        },
        loginSuccess: (state, action) => {
            state.fetching = false
            state.currentUser = action.payload
        },
        loginFail : (state) => {
            state.fetching = false;
            state.error = true;
        },

        // Get users
        getUserStart: (state => {
            state.fetching = true;
            state.error = false;
        }),
        getUserSuccess: (state, action) => {
            state.fetching = false;
            state.users = action.payload;
        },
        getUserFailure: (state) => {
            state.fetching = false;
            state.error = false;
        },

        // Delete users
        deleteUserStart: (state) => {
            state.fetching = true;
            state.error = false;
        },
        
        deleteUserSuccess: (state,action) => {
            state.fetching =false;
            state.users.splice(
                state.users.findIndex(item => item._id === action.payload),1
            )
        },
        deleteUserFailure: (state) => {
            state.fetching = false;
            state.error = true;
        }
    }
})

export const {loginStart, loginSuccess, loginFail, getUserFailure, getUserStart, getUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess} = userSlice.actions;

export default userSlice.reducer;