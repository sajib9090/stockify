import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  // token: null,
  brand: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      // state.token = token;
    },
    setBrand: (state, action) => {
      const { brand } = action.payload;
      state.brand = brand;
    },
    logout: (state) => {
      state.user = null;
      // state.token = null;
      state.brand = null;
    },
  },
});

export const { setUser, logout, setBrand } = authSlice.actions;

export default authSlice.reducer;

export const currentUser = (state) => state.auth.user;
export const currentUserBrand = (state) => state.auth.brand;
// export const currentUserToken = (state) => state.auth.token;
