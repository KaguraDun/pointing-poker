/* eslint-disable react-redux/useSelector-prefer-selectors */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SessionData from '@/components/SessionData/SessionData';
import UsersList from '@/components/UsersList/UsersList';
import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

const Lobby = () => {
  const history = useHistory();
  const roomData = useSelector(({ room }: RootState) => room.room);
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
      history.push('/game');
    }
  }, [history, isGameStared]);

  return (
    <div>
      Lobby
      <SessionData />
      <UsersList />
    </div>
  );
};

export default Lobby;
