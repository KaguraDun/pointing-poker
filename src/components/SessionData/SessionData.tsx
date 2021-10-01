import React from 'react';
import { useHistory } from 'react-router-dom';

import roomApi from '@/services/roomApi';

import Button from '../Button/Button';
import s from './SessionData.scss';

const SessionData = () => {
  const history = useHistory();
  const sessionId = roomApi.getCurrentRoomID();
  const handleQuit = () => {
    roomApi.RemoveUser();
    history.push('/');
  };

  return (
    <div className={s.session}>
      <p className={s.sessionId}>Session ID: {sessionId}</p>
      <Button handleClick={() => handleQuit()} variant="additional">
        Quit
      </Button>
    </div>
  );
};

export default SessionData;
