/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import Game from '@/models/game';

const initialState = {} as any as Game;

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    game: initialState,
  },

  reducers: {
    updateGameState: (state, action) => {
      state.game = action.payload;
    },
  },
});

export const { updateGameState } = gameSlice.actions;

export default gameSlice.reducer;
