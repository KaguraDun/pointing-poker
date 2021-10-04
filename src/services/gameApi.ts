import { Game, Round } from '@/models/game';
import { Issue } from '@/models/issue';
import { roomEvents } from '@/models/room';
import roomApi from '@/services/roomApi';
import store from '@/store';

import socket from './SocketService';

const gameApi = {
  runNextRound(issueID: string) {
    roomApi.updateGameState({ currentIssueID: issueID } as Game);
  },
  setTimerStart(isTimerStart: boolean) {
    roomApi.updateGameState({ isTimerStart } as Game);
  },
  setRoundTime(roundTime: number) {
    roomApi.updateGameState({ roundTime } as Game);
  },
  selectCard(issueID: string, cardValue: string) {
    const userID = roomApi.getCurrentUserID();
    this.updateRoundHistory(issueID, userID, {
      isCardSelected: true,
      score: cardValue,
    });
  },
  gameEnd() {
    roomApi.updateGameState({ isEnded: true } as Game);
  },
  updateRoundAverageScore(issueID: string, score: number) {
    const roundHistory = {
      roundHistory: {
        [issueID]: {
          averageScore: score,
        },
      },
    } as Game;
    roomApi.updateGameState(roundHistory);
  },
  updateRoundHistory(issueID: string, userID: string, RoundData: Round) {
    const roundHistory = {
      roundHistory: {
        [issueID]: {
          averageScore: null,
          roundData: {
            [userID]: RoundData,
          },
        },
      },
    } as Game;
    roomApi.updateGameState(roundHistory);
  },
  createIssue(issueData: Issue) {
    const roomID = roomApi.getCurrentRoomID();
    socket.emit(roomEvents.ADD_ISSUE, { roomID, issueData });
    roomApi.getRoomFromServer(roomID);
  },
  deleteIssue(issueID: string) {
    const roomID = roomApi.getCurrentRoomID();
    socket.emit(roomEvents.DELETE_ISSUE, { roomID, issueID });
    roomApi.getRoomFromServer(roomID);
  },
  editIssue(issueID: string, issueData: Issue) {
    const roomID = roomApi.getCurrentRoomID();
    socket.emit(roomEvents.EDIT_ISSUE, { roomID, issueID, issueData });
    roomApi.getRoomFromServer(roomID);
  },
  prepareDataToSave() {
    const { roundHistory } = store.getState().game.game;
    const roomData = store.getState().room.room;
    if (roundHistory) {
      const users = Object.values(roomData.users).map(
        (user) => `${user.name} ${user.surname}`
      );

      const data = Object.entries(roundHistory).map(([key, values]) => {
        const { title, link, priority } = roomData.issues[key];
        const score = roundHistory[key].averageScore;
        const userScores = {};

        Object.values(values.roundData).forEach((user, index) => {
          userScores[users[index]] = user.score;
        });

        return { link, title, priority, average: score, ...userScores };
      });

      return data;
    }
    return [];
  },
};

export default gameApi;
