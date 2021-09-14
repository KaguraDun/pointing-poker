import { configureStore } from '@reduxjs/toolkit';

import chatSlice from '@/features/chat';

const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
