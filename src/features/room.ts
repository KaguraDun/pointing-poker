/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Room } from '@/models/room';

const initialState = {} as any as Room;

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    room: initialState,
    chatMessages: [],
    userID: '',
    roomNotFound: false,
    showModalConnectRoom: false,
  },
  reducers: {
    addRoom: (state, action) => {
      state.room = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setRoomNotFound: (state, action) => {
      state.roomNotFound = action.payload;
    },
    toggleModalConnectRoom: (state, action) => {
      state.showModalConnectRoom = action.payload;
    },
    addChatMessage: (state, action) => {
      const { ID, userID, text } = action.payload;
      state.chatMessages.unshift({ ID, userID, text });
    },
    resetState: (state) => {
      state.room = initialState;
      state.userID = '';
      state.roomNotFound = false;
      state.showModalConnectRoom = false;
    },
  },
});

export const {
  addRoom,
  setUserID,
  setRoomNotFound,
  toggleModalConnectRoom,
  addChatMessage,
  resetState,
} = roomSlice.actions;

export default roomSlice.reducer;
