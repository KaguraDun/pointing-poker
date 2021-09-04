import reducerSlice from '@features/reducerSlice';
import { configureStore } from '@reduxjs/toolkit';

// rename reducerSlice to a more suitable name

const store = configureStore({
  reducer: {
    reducer: reducerSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
