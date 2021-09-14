import { updateMessages } from '@/features/chat';
import { chatEvents, ChatMessage } from '@/models/chat';
import store from '@/store';

import socket from './SocketService';

const chatApi = {
  sendMessage: (messageText: string) => {
    socket.emit(chatEvents.SEND_MESSAGE_FROM_CLIENT, messageText);
  },
  updateMessageList: () => {
    socket.on(chatEvents.GET_MESSAGE_FROM_SERVER, (response: ChatMessage) => {
      store.dispatch(updateMessages(response));
    });
  },
};

export default chatApi;
