const chatEvents = {
  SEND_MESSAGE_FROM_CLIENT: 'SEND_MESSAGE_FROM_CLIENT',
  GET_MESSAGE_FROM_SERVER: 'GET_MESSAGE_FROM_SERVER',
};

interface ChatMessage {
  messageID: string;
  text: string;
  userID: string;
}

export { chatEvents };
export type { ChatMessage };
