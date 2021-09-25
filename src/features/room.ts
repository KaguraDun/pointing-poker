/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Room } from '@/models/room';

const initialState = {} as any as Room;

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    room: initialState,
    roomNotFound: false,
    showModalConnectRoom: false,
  },
  reducers: {
    addRoom: (state, action) => {
      state.room = action.payload;
    },
    setRoomNotFound: (state, action) => {
      state.roomNotFound = action.payload;
    },
    toggleModalConnectRoom: (state) => {
      state.showModalConnectRoom = !state.showModalConnectRoom;
    },
    resetState: (state) => {
      state.room = initialState;
      state.roomNotFound = false;
      state.showModalConnectRoom = false;
    },
  },
});

export const { addRoom, setRoomNotFound, toggleModalConnectRoom, resetState } =
  roomSlice.actions;

export default roomSlice.reducer;
