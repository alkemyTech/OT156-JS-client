import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
        },

        logout: (state) => {
            state.token = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export const userState = state => state.user;

export default userSlice.reducer;
