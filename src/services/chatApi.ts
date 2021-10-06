import { addChatMessage } from '@/features/room';
import { chatEvents, ChatMessage } from '@/models/chat';
import store from '@/store';

import roomApi from './roomApi';
import socket from './SocketService';

const chatApi = {
  sendMessage: (messageText: string) => {
    const roomID = roomApi.getCurrentRoomID();
    const userID = roomApi.getCurrentUserID();

    socket.emit(chatEvents.SEND_MESSAGE_FROM_CLIENT, {
      roomID,
      userID,
      messageText,
    });
  },
  updateMessageList: () => {
    socket.on(chatEvents.GET_MESSAGE_FROM_SERVER, (response: ChatMessage) => {
      if (response.roomID === roomApi.getCurrentRoomID()) {
        store.dispatch(addChatMessage(response));
      }
    });
  },
};

export default chatApi;
