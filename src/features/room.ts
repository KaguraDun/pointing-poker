/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    room: {},
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
  },
});

export const { addRoom, setRoomNotFound, toggleModalConnectRoom } =
  roomSlice.actions;

export default roomSlice.reducer;
