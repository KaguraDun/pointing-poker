/* eslint-disable react-redux/useSelector-prefer-selectors */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import IssueList from '@/components/IssueList/IssueList';
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
  }, []);

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
      <IssueList />
    </div>
  );
};

export default Lobby;
