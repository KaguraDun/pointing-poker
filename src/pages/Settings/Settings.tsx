/* eslint-disable react-redux/useSelector-prefer-selectors */
import React from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/Button/Button';
import { RootState } from '@/store';

import s from './Settings.scss';

const Settings = () => {
  const lobbyLink = useSelector(({ room }: RootState) => room.room.ID);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(lobbyLink);
  };

  return (
    <div>
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

      <form>Game settings</form>
    </div>
  );
};

export default Settings;
