import roomApi from '@/services/roomApi';

const gameApi = {
  runNextRound(issueID: string) {
    roomApi.updateGameState({ currentIssueID: issueID });
  },
};

export default gameApi;
