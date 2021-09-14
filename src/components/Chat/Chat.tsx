/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ChatMessage } from '@/models/chat';
import chatApi from '@/services/ChatApi';
import { RootState } from '@/store';

import Button from '../Button/Button';
import s from './Chat.scss';

const Chat = () => {
  const [messageText, setMessageText] = useState('');
  const messageList = useSelector(({ chat }: RootState) => chat.messages);

  useEffect(() => {
    chatApi.updateMessageList();
  }, []);

  const submitMessage = (e: SubmitEvent) => {
    e.preventDefault();

    if (messageText) {
      chatApi.sendMessage(messageText);
      setMessageText('');
    }
  };

  interface MessageBoxProps {
    messages: ChatMessage[];
  }

  const MessageBox = ({ messages }: MessageBoxProps) => (
    <div className={s.messageBox}>
      {messages.map(({ messageID, text, userID }) => (
        <div key={userID + messageID} className={s.message}>
          <span>{`${userID}: ${text}`}</span>
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
          onChange={({ target }) => setMessageText(target.value)}
          type="text"
          value={messageText}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Chat;
