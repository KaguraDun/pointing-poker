import { Game, Round } from '@/models/game';
import roomApi from '@/services/roomApi';

const gameApi = {
  runNextRound(issueID: string) {
    roomApi.updateGameState({ currentIssueID: issueID });
  },
  setTimerStart(isTimerStart: boolean) {
    roomApi.updateGameState({ isTimerStart });
  },
  setRoundTime(roundTime: number) {
    roomApi.updateGameState({ roundTime });
  },
  selectCard(issueID: string, cardValue: string) {
    const userID = roomApi.getCurrentUserID();
    this.updateRoundHistory(issueID, userID, {
      isCardSelected: true,
      score: cardValue,
    });
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
    } as any as Game;
    roomApi.updateGameState(roundHistory);
  },
};

export default gameApi;
