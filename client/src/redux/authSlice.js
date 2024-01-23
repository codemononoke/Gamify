import { createSlice } from "@reduxjs/toolkit";

const access_token = JSON.parse(localStorage.getItem("access_token"));

const initialState = {
  signUpData: null,
  loading: false,
  access_token: access_token ? access_token : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignUpData(state, action) {
      state.signUpData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setAccessToken(state, action) {
      state.access_token = action.payload;
    },
  },
});

export const { setSignUpData, setLoading, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
