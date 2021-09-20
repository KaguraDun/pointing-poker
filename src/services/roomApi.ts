/* eslint-disable react-redux/useSelector-prefer-selectors */
import {
  addRoom,
  setRoomNotFound,
  toggleModalConnectRoom,
} from '@/features/room';
import { Member, UserEvents } from '@/models/member';
import { Room, roomEvents } from '@/models/room';
import store from '@/store';

import socket from './SocketService';

const roomApi = {
  createRoom(dealerData: Member) {
    socket.emit(roomEvents.CREATE_ROOM, dealerData);
    socket.on(roomEvents.GET_ROOM_FROM_SERVER, (response: Room) => {
      store.dispatch(addRoom(response));
    });
  },
  getRoomFromServer(roomID: string) {
    socket.emit(roomEvents.GET_ROOM_FROM_CLIENT, roomID);
    socket.on(roomEvents.GET_ROOM_FROM_SERVER, (response: Room) => {
      store.dispatch(addRoom(response));
    });
  },
  connect(roomID: string) {
    socket.emit(roomEvents.GET_ROOM_STATUS_FROM_CLIENT, roomID);
    socket.on(roomEvents.GET_ROOM_STATUS_FROM_SERVER, (response: boolean) => {
      if (response) {
        socket.emit(roomEvents.CONNECT_TO_ROOM, roomID);
        socket.on(roomEvents.GET_ROOM_FROM_SERVER, (responseRoom: Room) => {
          store.dispatch(addRoom(responseRoom));
        });
        store.dispatch(toggleModalConnectRoom());
        store.dispatch(setRoomNotFound(false));
      } else {
        store.dispatch(setRoomNotFound(true));
      }
    });
  },
  AddUser(userData: Member) {
    const roomID = store.getState().room.room.ID;
    socket.emit(UserEvents.ADD_USER_FROM_CLIENT, { userData, roomID });
    this.getRoomFromServer(roomID);
  },
};

export default roomApi;
