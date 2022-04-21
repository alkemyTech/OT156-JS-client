import { createSlice } from "@reduxjs/toolkit";
import { deleteRequest } from "../../services/apiService";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
  },
  reducers: {
    login: (state, action) => {
      const { id, firstName, lastName, email, image, roleId, token } =
        action.payload;
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
    deleteUser: (state,) => {
      state = null;
    },
  },
});

export const { login, logout, deleteUser } = userSlice.actions;

export const userState = (state) => state.user;

export default userSlice.reducer;

export const deleteUsers = (id) => async(dispatch) => {
  await deleteRequest(`http://localhost:3000/users/${id}`);
  window.localStorage.removeItem("token");
  dispatch(deleteUser());
};
