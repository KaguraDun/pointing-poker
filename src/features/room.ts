/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Room } from '@/models/room';

const initialState = {} as any as Room;

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    room: initialState,
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
    toggleModalConnectRoom: (state) => {
      state.showModalConnectRoom = !state.showModalConnectRoom;
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
  setRoomNotFound,
  toggleModalConnectRoom,
  resetState,
  setUserID,
} = roomSlice.actions;

export default roomSlice.reducer;
