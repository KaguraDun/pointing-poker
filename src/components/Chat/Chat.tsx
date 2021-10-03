/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ChatMessage } from '@/models/chat';
import chatApi from '@/services/chatApi';
import { RootState } from '@/store';

import Button from '../Button/Button';
import s from './Chat.scss';

const Chat = () => {
  const [message, setMessage] = useState('');
  const messageList = useSelector(({ room }: RootState) => room.chatMessages);
  const userList = useSelector(({ room }: RootState) => room.room.users);

  useEffect(() => {
    chatApi.updateMessageList();
  }, []);

  const submitMessage = (e: SubmitEvent) => {
    e.preventDefault();

    if (message) {
      chatApi.sendMessage(message);
      setMessage('');
    }
  };

  interface MessageBoxProps {
    messages: ChatMessage[];
  }

  const getUserName = (userID: string) =>
    userList ? userList[userID]?.name : 'error';

  const MessageBox = ({ messages }: MessageBoxProps) => (
    <div className={s.messageBox}>
      {messages.map(({ ID, userID, text }) => (
        <div key={ID} className={s.message}>
          <span>{`${getUserName(userID)}: ${text}`}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={s.chat}>
      <MessageBox messages={messageList} />
      <form className={s.controls} onSubmit={(e) => submitMessage(e)}>
        <input
          className={s.input}
          onChange={({ target }) => setMessage(target.value)}
          type="text"
          value={message}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Chat;
