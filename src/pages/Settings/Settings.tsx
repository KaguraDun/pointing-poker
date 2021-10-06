/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Chat from '@/components/Chat/Chat';
import Dropdown from '@/components/Dropdown/Dropdowns';
import IssueList from '@/components/IssueList/IssueList';
import UsersList from '@/components/UsersList/UsersList';
import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import s from './Settings.scss';

const Settings = () => {
  const roomData = useSelector(({ room }: RootState) => room.room);

  useEffect(() => {
    if (!Object.keys(roomData).length) {
      roomApi.restoreDataFromServer();
    }
  }, [roomData]);

  const lobbyLink = useSelector(({ room }: RootState) => room.room.ID);
  const history = useHistory();

  const dealerAsPlayer = useSelector(
    ({ room }: RootState) => room.room.settings?.dealerAsPlayer
  );

  const decks = useSelector(({ room }: RootState) => room.room.settings?.decks);

  const currentDeck = useSelector(
    ({ room }: RootState) => room.room.settings?.currentDeck
  );

  const roundDurationSeconds = useSelector(
    ({ room }: RootState) => room.room.settings?.roundDurationSeconds
  );

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

  const handleUpdateSettings = (newValue: any) => {
    roomApi.updateSettings(newValue);
  };

  const getDeckValues = () => {
    if (!decks) return [];
    return Object.entries(decks).map(([key, value]) => ({
      value: key,
      name: value.name,
    }));
  };

  return (
    <div className={s.settings}>
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
      <form className={s.settingsForm}>
        <h3 className={s.formTitle}>Game settings</h3>
        <ToggleSwitch
          handleToggle={(e: ChangeEvent) =>
            handleUpdateSettings({
              dealerAsPlayer: (e.target as HTMLInputElement).checked,
            })
          }
          isOn={dealerAsPlayer || false}
          name="Dealer as player"
        />
        <div className={s.dropdown}>
          <Dropdown
            defaultValue={currentDeck}
            handleOnChange={(e: ChangeEvent) =>
              handleUpdateSettings({
                currentDeck: (e.target as HTMLInputElement).value,
              })
            }
            label="Select deck"
            options={getDeckValues()}
          />
        </div>
        <label className={s.roundDuration}>
          Round duration in seconds
          <input
            className={s.inputRoundDuration}
            min="5"
            onChange={(e: ChangeEvent) =>
              handleUpdateSettings({
                roundDurationSeconds: (e.target as HTMLInputElement).value,
              })
            }
            type="number"
            value={roundDurationSeconds}
          />
        </label>
      </form>
      <div className={s.issuesList}>
        <IssueList />
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

export default Settings;
