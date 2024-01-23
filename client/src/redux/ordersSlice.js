import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setOrders, setLoading } = ordersSlice.actions;
export default ordersSlice.reducer;
