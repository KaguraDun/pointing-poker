/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CardDeck from '@/components/CardDeck/CardDeck';
import Chat from '@/components/Chat/Chat';
import ScoreCard from '@/components/ScoreCard/ScoreCard';
import Timer from '@/components/Timer/Timer';
import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

import gameApi from '../../services/gameApi';
import s from './Game.scss';

const Game = () => {
  const history = useHistory();
  const userID = roomApi.getCurrentUserID();
  const roomData = useSelector(({ room }: RootState) => room?.room);
  const isTimerEnabled = useSelector(
    ({ room }: RootState) => room.room?.settings?.enableTimer
  );
  const roundDuration = useSelector(
    ({ room }: RootState) => room.room?.settings?.roundDurationSeconds
  );
  const currentDeck = useSelector(
    ({ room }: RootState) => room.room?.settings?.currentDeck
  );
  const decks = useSelector(
    ({ room }: RootState) => room.room?.settings?.decks
  );
  const issues = useSelector(({ room }: RootState) => room.room.issues);
  const users = useSelector(({ room }: RootState) => room.room.users);
  const currentIssueID = useSelector(
    ({ game }: RootState) => game.game.currentIssueID
  );
  const roundHistory = useSelector(({ game }: RootState) => {
    if (currentIssueID) {
      return game.game?.roundHistory?.[currentIssueID];
    }

    return null;
  });
  const gameHistory = useSelector(({ game }: RootState) => {
    if (currentIssueID) {
      return game.game?.roundHistory;
    }

    return null;
  });
  const isTimerStart = useSelector(
    ({ game }: RootState) => game.game.isTimerStart
  );

  useEffect(() => {
    if (!Object.keys(roomData).length) {
      roomApi.restoreDataFromServer();
    }
  }, [roomData]);

  useEffect(() => {
    if (currentIssueID === null) {
      const firstIssueID = Object.keys(issues)[0];
      gameApi.runNextRound(firstIssueID);
    }
  }, [currentIssueID, issues]);

  const getCurrentDeck = () => {
    if (decks && currentDeck) {
      return decks[currentDeck].values;
    }
    return [];
  };

  const getIssuesList = () => {
    if (issues) {
      return Object.values(issues).map((value, index) => (
        <div>
          {/* replace when user list component will be complete */}
          {`${String(index + 1) === currentIssueID ? '->' : ''}${index + 1} ${
            value.title
          } - ${gameHistory?.[String(index + 1)]?.averageScore || '...'}`}
        </div>
      ));
    }
    return 'Error';
  };

  const getUserList = () => {
    if (users) {
      return Object.values(users).map((value) => {
        const score = roundHistory?.roundData?.[value.ID].score;
        return (
          <div className={s.userScore}>
            <ScoreCard score={score || '...'} />
            <div>{`${value.ID}: ${value.name} ${value.surname}`}</div>
          </div>
        );
      });
    }
    return 'Error';
  };

  const calculateAverageScore = () => {
    let userCount = Object.keys(users).length;
    let userScoreSum = 0;

    if (roundHistory) {
      Object.values(roundHistory.roundData).forEach((value) => {
        const score = Number(value.score);

        if (Number.isNaN(score)) {
          userCount -= 1;
        } else {
          userScoreSum += score;
        }
      });
    }
    return userScoreSum / userCount;
  };

  const handleTimerEnd = () => {
    gameApi.updateRoundAverageScore(currentIssueID, calculateAverageScore());
    const issuesArr = Object.keys(issues);
    const nextIssue = issuesArr.indexOf(currentIssueID) + 1;
    if (issuesArr[nextIssue]) {
      gameApi.runNextRound(issuesArr[nextIssue]);
    } else {
      gameApi.gameEnd();
      history.push('./game-results');
    }
  };

  const handleSelectCard = (cardValue: string) => {
    if (isTimerStart || !isTimerEnabled) {
      gameApi.selectCard(currentIssueID, cardValue);
    }
  };

  return (
    <div className={s.game}>
      <div className={s.dealer}>SCRAM_MASTER</div>
      <div className={s.issues}>{getIssuesList()}</div>
      <div className={s.timer}>
        {isTimerEnabled ? (
          <Timer
            durationInSeconds={roundDuration}
            handleTimerEnd={handleTimerEnd}
            showControls
          />
        ) : null}
      </div>
      <div className={s.userScores}>{getUserList()}</div>
      <div className={s.deck}>
        <CardDeck
          deck={getCurrentDeck()}
          handleSelectCard={handleSelectCard}
          isCardSelected={roundHistory?.roundData?.[userID]?.isCardSelected}
          selectedValue={roundHistory?.roundData?.[userID]?.score}
        />
      </div>
      <div className={s.chat}>
        <Chat />
      </div>
    </div>
  );
};
export default Game;
