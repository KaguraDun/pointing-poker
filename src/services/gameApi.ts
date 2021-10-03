import { Game, Round } from '@/models/game';
import roomApi from '@/services/roomApi';

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
};

export default gameApi;
