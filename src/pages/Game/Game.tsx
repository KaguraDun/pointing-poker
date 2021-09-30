/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

import s from './Game.scss';

const Game = () => {
  const roomData = useSelector(({ room }: RootState) => room?.room);

  useEffect(() => {
    if (!Object.keys(roomData).length) {
      roomApi.restoreDataFromServer();
    }
  }, [roomData]);


  return (
    <div className={s.game}>
      Game
    </div>
  );
};
export default Game;
