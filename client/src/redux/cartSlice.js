import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error("Error loading cart from local storage: ", error);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Error saving cart to local storage: ", error);
  }
};

const initialState = {
  openCart: false,
  cart: loadCartFromLocalStorage(),
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addGame(state, action) {
      state.cart.push(action.payload);
      saveCartToLocalStorage(state.cart);
    },
    removeGame(state, action) {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
      saveCartToLocalStorage(state.cart);
    },
    clearCart(state) {
      state.cart = [];
      saveCartToLocalStorage(state.cart);
    },
    setOpenCart(state, action) {
      state.openCart = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { addGame, removeGame, clearCart, setOpenCart, setLoading } =
  cartSlice.actions;
export default cartSlice.reducer;
