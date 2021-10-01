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
};

export default gameApi;
