/* eslint-disable react-redux/useSelector-prefer-selectors */



import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

const Lobby = () => {
  const roomData = useSelector(({ room }: RootState) => room.room);

  useEffect(() => {
    if (!Object.keys(roomData).length) {
      roomApi.restoreDataFromServer();
    }
  }, [roomData]);

  return <div>Lobby</div>;
};


export default Lobby;
