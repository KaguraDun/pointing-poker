/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@/components/Button/Button';
import CardDeck from '@/components/CardDeck/CardDeck';
import Chat from '@/components/Chat/Chat';
import IssueCard from '@/components/IssueCard/IssueCard';
import IssueCardNew from '@/components/IssueCard/IssueCardNew';
import MemberCard from '@/components/MemberCard/MemberCard';
import ScoreCard from '@/components/ScoreCard/ScoreCard';
import Timer from '@/components/Timer/Timer';
import { UserRoles } from '@/models/member';
import gameApi from '@/services/gameApi';
import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

import s from './Game.scss';

const Game = () => {
  const history = useHistory();
  const currentUserID = roomApi.getCurrentUserID();
  const roomData = useSelector(({ room }: RootState) => room?.room);
  const dealerAsPlayer = useSelector(
    ({ room }: RootState) => room.room?.settings?.dealerAsPlayer
  );
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

  const isGameEnded = useSelector(({ game }: RootState) => game.game.isEnded);

  useEffect(() => {
    roomApi.SubscribeRoomClose();
    roomApi.subscribeOnUserDisconnected();
  }, []);

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

  const isUserRolePlayer = (userID: string) =>
    users?.[userID]?.role === UserRoles.player;

  const isUserRoleDealer = users?.[currentUserID]?.role === UserRoles.dealer;

  const getCurrentDeck = () => {
    if (decks && currentDeck) {
      return decks[currentDeck].values;
    }
    return [];
  };

  const getIssuesList = () => {
    if (issues) {
      const issueList = Object.values(issues).map((value) => (
        <li key={`issue-list${value.ID}`} className={s.issueWrapper}>
          <IssueCard
            ID={value.ID}
            link={value.link}
            priority={value.priority}
            showControls={isUserRoleDealer}
            title={value.title}
          />
          <ScoreCard score={gameHistory?.[value.ID]?.averageScore || '...'} />
        </li>
      ));
      if (isUserRoleDealer) {
        issueList.push(<IssueCardNew />);
      }

      return issueList;
    }
    return 'Error';
  };

  const getUserList = () => {
    if (users) {
      return Object.values(users).map((value) => {
        const score = roundHistory?.roundData?.[value.ID]?.score;
        const showUserScore = dealerAsPlayer || isUserRolePlayer(value.ID);
        if (showUserScore) {
          return (
            <li key={`user-score${value.ID}`} className={s.userScore}>
              <ScoreCard key={Number(value.ID)} score={score || '...'} />
              <MemberCard
                id={value.ID}
                image={value.image}
                name={value.name}
                position={value.position}
                role={value.role}
                showControls={isUserRoleDealer}
                surname={value.surname}
              />
            </li>
          );
        }
        return null;
      });
    }
    return 'Error';
  };

  const calculateAverageScore = () => {
    let userCount = Object.keys(users).length;
    let userScoreSum = 0;

    if (!dealerAsPlayer) userCount -= 1;

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
    }
  };

  const handleViewGameResult = () => {
    history.push('./game-results');
  };

  const handleSelectCard = (cardValue: string) => {
    if (isTimerStart || !isTimerEnabled) {
      gameApi.selectCard(currentIssueID, cardValue);
    }
  };

  const showCardDeck = dealerAsPlayer || isUserRolePlayer(currentUserID);

  return (
    <div className={s.game}>
      <div className={s.dealer}>
        <MemberCard
          image={users?.[roomData.owner]?.image}
          name={users?.[roomData.owner]?.name}
          position={users?.[roomData.owner]?.position}
          role={users?.[roomData.owner]?.role}
          surname={users?.[roomData.owner]?.surname}
        />
      </div>
      <ul className={s.issues}>{getIssuesList()}</ul>
      <div className={s.timer}>
        {isTimerEnabled ? (
          <Timer
            durationInSeconds={roundDuration}
            handleTimerEnd={handleTimerEnd}
            showControls={isUserRoleDealer}
          />
        ) : null}
      </div>
      <div className={s.viewGameResults}>
        {isGameEnded ? (
          <Button handleClick={handleViewGameResult}>View game Results</Button>
        ) : null}
      </div>
      <ul className={s.userScores}>{getUserList()}</ul>
      <div className={s.deck}>
        {showCardDeck ? (
          <CardDeck
            deck={getCurrentDeck()}
            handleSelectCard={handleSelectCard}
            isCardSelected={
              roundHistory?.roundData?.[currentUserID]?.isCardSelected
            }
            selectedValue={roundHistory?.roundData?.[currentUserID]?.score}
          />
        ) : null}
      </div>
      <div className={s.chat}>
        <Chat />
      </div>
    </div>
  );
};
export default Game;
