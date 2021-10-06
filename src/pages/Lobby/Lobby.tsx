/* eslint-disable react-redux/useSelector-prefer-selectors */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Chat from '@/components/Chat/Chat';
import SessionData from '@/components/SessionData/SessionData';
import UsersList from '@/components/UsersList/UsersList';
import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

import s from './Lobby.scss';

const Lobby = () => {
  const history = useHistory();
  const roomData = useSelector(({ room }: RootState) => room.room);
  const roomID = useSelector(({ room }: RootState) => room.room.ID);
  const isGameStared = useSelector(
    ({ game }: RootState) => game.game.isStarted
  );
  useEffect(() => {
    if (!Object.keys(roomData).length) {
      roomApi.restoreDataFromServer();
    }
  }, [roomData]);

  useEffect(() => {
    roomApi.SubscribeRoomClose();
    roomApi.subscribeOnUserDisconnected();
  }, []);

  useEffect(() => {
    roomApi.subscribeOnGameStart(() => history.push('/game'));
  }, [history]);

  useEffect(() => {
    if (isGameStared) {
      history.push(`/game/${roomID}`);
    }
  }, [history, isGameStared, roomID]);

  return (
    <div className={s.lobby}>
      <h2 className={s.title}>Waiting for the start of the game</h2>
      <div className={s.sessionData}>
        <SessionData />
      </div>
      <div className={s.userList}>
        <UsersList />
      </div>
      <div className={s.chat}>
        <Chat />
      </div>
    </div>
  );
};

export default Lobby;
