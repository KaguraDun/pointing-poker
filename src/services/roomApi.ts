/* eslint-disable react-redux/useSelector-prefer-selectors */
import { updateGameState } from '@/features/game';
import {
  addRoom,
  resetState,
  setRoomNotFound,
  setUserID,
  toggleModalConnectRoom,
} from '@/features/room';
import { Game } from '@/models/game';
import { Member, UserEvents } from '@/models/member';
import { Room, roomEvents, Settings } from '@/models/room';
import store from '@/store';

import saveStateApi from './saveStateApi';
import socket from './SocketService';

const roomApi = {
  isRoomIDKnown() {
    return this.getCurrentRoomID() !== undefined;
  },
  isTheSameRoom(responseID: string) {
    return this.getCurrentRoomID() === responseID;
  },
  getCurrentRoomID() {
    return store.getState().room.room.ID;
  },
  getCurrentUserID() {
    return store.getState().room.userID;
  },
  restoreDataFromServer() {
    const data = saveStateApi.loadStateFromStorage();
    if (data) {
      this.reconnect(data.roomID);
      this.getRoomFromServer(data.roomID);
      store.dispatch(setUserID(data.userID));
    }
  },
  saveDataToStorage() {
    const roomID = this.getCurrentRoomID();
    const userID = this.getCurrentUserID() || store.getState().room.room.owner;
    saveStateApi.saveStateToStorage({ roomID, userID });
  },
  createRoom(dealerData: Member) {
    socket.emit(roomEvents.CREATE_ROOM, dealerData);
    socket.on(roomEvents.GET_ROOM_FROM_SERVER, (response: Room) => {
      store.dispatch(addRoom(response));
      const userID = store.getState().room.room.owner;

      store.dispatch(setUserID(userID));
      this.saveDataToStorage();
    });
  },
  getRoomFromServer(roomID: string) {
    socket.emit(roomEvents.GET_ROOM_FROM_CLIENT, roomID);
    socket.on(roomEvents.GET_ROOM_FROM_SERVER, (response: Room) => {
      const { game, ...room } = response;

      store.dispatch(addRoom(room));
      store.dispatch(updateGameState(game));
    });
  },
  connect(roomID: string) {
    socket.emit(roomEvents.GET_ROOM_STATUS_FROM_CLIENT, roomID);
    socket.on(roomEvents.GET_ROOM_STATUS_FROM_SERVER, (response: boolean) => {
      if (response) {
        socket.emit(roomEvents.CONNECT_TO_ROOM, roomID);
        socket.on(roomEvents.GET_ROOM_FROM_SERVER, (responseRoom: Room) => {
          store.dispatch(addRoom(responseRoom));
          store.dispatch(toggleModalConnectRoom(true));
          store.dispatch(setRoomNotFound(false));
        });
      } else {
        store.dispatch(setRoomNotFound(true));
        store.dispatch(toggleModalConnectRoom(false));
      }
    });
  },
  reconnect(roomID: string) {
    socket.emit(roomEvents.RECONNECT_TO_ROOM, roomID);
  },
  AddUser(userData: Member) {
    const roomID = this.getCurrentRoomID();

    interface Response {
      roomID: string;
      userID: string;
    }

    socket.emit(UserEvents.ADD_USER_FROM_CLIENT, { userData, roomID });
    socket.on(roomEvents.USER_CONNECTED, ({ userID }: Response) => {
      if (this.getCurrentUserID() !== '') return;

      store.dispatch(setUserID(userID));
      saveStateApi.saveStateToStorage({ roomID, userID });
    });

    this.getRoomFromServer(roomID);
  },
  removeUser(userID: string) {
    const roomID = this.getCurrentRoomID();
    socket.emit(roomEvents.DISCONNECT_FROM_ROOM, { roomID, userID });
    this.getRoomFromServer(roomID);
  },
  subscribeOnUserDisconnected() {
    socket.on(
      roomEvents.USER_DISCONNECTED,
      ({ roomID, userID }: { roomID: string; userID: string }) => {
        if (
          roomApi.isTheSameRoom(roomID) &&
          this.getCurrentUserID() === userID
        ) {
          store.dispatch(resetState());
          saveStateApi.clearStorage();
          window.location = '/';
        }
      }
    );
  },
  subscribeOnGameStart(callback: any) {
    socket.on(roomEvents.GAME_BEGUN, (roomID: string) => {
      if (roomApi.isTheSameRoom(roomID)) {
        callback();
      }
    });
  },
  SubscribeRoomClose() {
    socket.on(roomEvents.ROOM_CLOSED, (responseID: string) => {
      if (roomApi.isTheSameRoom(responseID)) {
        store.dispatch(resetState());
        saveStateApi.clearStorage();
        window.location = '/';
      }
    });
  },
  startGame() {
    const roomID = this.getCurrentRoomID();
    socket.emit(roomEvents.START_GAME, roomID);
    this.getRoomFromServer(roomID);
  },
  updateGameState(newGameState: Game) {
    const roomID = this.getCurrentRoomID();
    socket.emit(roomEvents.UPDATE_GAME_STATE, { roomID, newGameState });
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
