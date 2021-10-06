interface Round {
  score: string;
  isCardSelected: boolean;
}

interface IssueData {
  averageScore: number;
  roundData: Record<UserID, Round>;
}

type IssueID = string;
type UserID = string;
type RoundHistory = Record<IssueID, IssueData>;

interface Game {
  isStarted: boolean;
  isEnded: boolean;
  isTimerStart: boolean;
  isCardSelected: boolean;
  currentIssueID: string;
  roundHistory: RoundHistory;
  roundTime: number;
}

export type { Game, Round, RoundHistory };
