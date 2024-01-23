import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  game: null,
  games: [],
  loading: false,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGame(state, action) {
      state.game = action.payload;
    },
    setGames(state, action) {
      state.games = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setGame, setGames, setLoading } = gamesSlice.actions;
export default gamesSlice.reducer;
