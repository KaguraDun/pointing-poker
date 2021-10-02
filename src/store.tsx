import { configureStore } from '@reduxjs/toolkit';

import gameSlice from '@/features/game';
import roomSlice from '@/features/room';

const store = configureStore({
  reducer: {
    room: roomSlice,
    game: gameSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
