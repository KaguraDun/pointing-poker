/* eslint-disable react-redux/useSelector-prefer-selectors */
import {
  addRoom,
  resetState,
  setRoomNotFound,
  setUserID,
  toggleModalConnectRoom,
} from '@/features/room';
import { Member, UserEvents } from '@/models/member';
import { Room, roomEvents, Settings } from '@/models/room';
import store from '@/store';

import saveStateApi from './saveStateApi';
import socket from './SocketService';

const roomApi = {
  restoreDataFromServer() {
    const data = saveStateApi.loadStateFromStorage();
    if (data) {
      this.getRoomFromServer(data.roomID);
      store.dispatch(setUserID(data.userID));
    }
  },
  createRoom(dealerData: Member) {
    socket.emit(roomEvents.CREATE_ROOM, dealerData);
    socket.on(roomEvents.GET_ROOM_FROM_SERVER, (response: Room) => {
      store.dispatch(addRoom(response));

      const roomID = this.getCurrentRoomID();
      const userID = store.getState().room.room.owner;

      store.dispatch(setUserID(userID));
      saveStateApi.saveStateToStorage({ roomID, userID });
    });
  },
  getRoomFromServer(roomID: string) {
    socket.emit(roomEvents.GET_ROOM_FROM_CLIENT, roomID);
    socket.on(roomEvents.GET_ROOM_FROM_SERVER, (response: Room) => {
      store.dispatch(addRoom(response));
    });
  },
  getCurrentRoomID() {
    return store.getState().room.room.ID;
  },
  connect(roomID: string) {
    socket.emit(roomEvents.GET_ROOM_STATUS_FROM_CLIENT, roomID);
    socket.on(roomEvents.GET_ROOM_STATUS_FROM_SERVER, (response: boolean) => {
      if (response) {
        socket.emit(roomEvents.CONNECT_TO_ROOM, roomID);
        socket.on(roomEvents.GET_ROOM_FROM_SERVER, (responseRoom: Room) => {
          store.dispatch(addRoom(responseRoom));
          store.dispatch(toggleModalConnectRoom());
          store.dispatch(setRoomNotFound(false));
        });
      } else {
        store.dispatch(setRoomNotFound(true));
      }
    });
  },
  AddUser(userData: Member) {
    const roomID = this.getCurrentRoomID();

    interface Response {
      roomID: string;
      userID: string;
    }

    socket.emit(UserEvents.ADD_USER_FROM_CLIENT, { userData, roomID });
    socket.on(roomEvents.USER_CONNECTED, ({ userID }: Response) => {
      store.dispatch(setUserID(userID));
      saveStateApi.saveStateToStorage({ roomID, userID });
    });

    this.getRoomFromServer(roomID);
  },
  startGame() {
    const roomID = this.getCurrentRoomID();
    socket.emit(roomEvents.START_GAME, roomID);
    this.getRoomFromServer(roomID);
  },
  close() {
    const roomID = this.getCurrentRoomID();
    socket.emit(roomEvents.CLOSE_ROOM, roomID);
    store.dispatch(resetState());
    saveStateApi.clearStorage();
  },
  updateSettings(newSettings: Settings) {
    const roomID = this.getCurrentRoomID();
    socket.emit(roomEvents.UPDATE_SETTINGS, { roomID, newSettings });
    this.getRoomFromServer(roomID);
  },
};

export default roomApi;
