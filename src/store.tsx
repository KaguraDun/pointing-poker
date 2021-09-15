import { configureStore } from '@reduxjs/toolkit';

import chatSlice from '@/features/chat';
import roomSlice from '@/features/room';

const store = configureStore({
  reducer: {
    chat: chatSlice,
    room: roomSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
