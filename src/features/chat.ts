/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  },
  reducers: {
    updateMessages: (state, action) => {
      const { messageID, text, userID } = action.payload;
      state.messages.unshift({ messageID, text, userID });
    },
  },
});

export const { updateMessages } = chatSlice.actions;

export default chatSlice.reducer;
