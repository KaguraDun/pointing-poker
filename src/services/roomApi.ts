import { addRoom } from '@/features/room';
import { Member } from '@/models/member';
import { Room, roomEvents } from '@/models/room';
import store from '@/store';

import socket from './SocketService';

const roomApi = {
  createRoom: (dealerData: Member) => {
    const updatedData = { ...dealerData, ID: socket.userID };
    socket.emit(roomEvents.CREATE_ROOM, updatedData);

    socket.on(roomEvents.GET_ROOM_FROM_SERVER, (response: Room) => {
      store.dispatch(addRoom(response));
    });
  },
};

export default roomApi;
