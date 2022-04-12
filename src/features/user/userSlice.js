import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
    },
    reducers: {
        login: (state, action) => {
            const {id,firstName,lastName,email,image,roleId,token} = action.payload;
            state.id = id;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.image = image;
            state.roleId = roleId;
            state.token = token;
        },

        logout: (state) => {
            state = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export const userState = state => state.user;

export default userSlice.reducer;
