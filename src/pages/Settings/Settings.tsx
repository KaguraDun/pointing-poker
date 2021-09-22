/* eslint-disable react-redux/useSelector-prefer-selectors */
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@/components/Button/Button';
import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

import s from './Settings.scss';

const Settings = () => {
  const lobbyLink = useSelector(({ room }: RootState) => room.room.ID);
  const history = useHistory();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(lobbyLink);
  };

  const handleStartGame = () => {
    roomApi.startGame();
    history.push(`/game`);
  };

  const handleCloseGame = () => {
    roomApi.close();
    history.push('/');
  };

  return (
    <>
      <div className={s.linkWrapper}>
        <label>
          Link to lobby
          <div className={s.inputWrapper}>
            <input readOnly type="text" value={lobbyLink || ''} />
            <Button
              handleClick={handleCopyLink}
              size="small"
              variant="additional"
            >
              Copy
            </Button>
          </div>
        </label>
      </div>
      <div className={s.gameButtons}>
        <Button handleClick={handleStartGame}>Start game</Button>
        <Button handleClick={handleCloseGame}>Close game</Button>
      </div>


      <form>Game settings</form>
    </>
  );
};

export default Settings;
