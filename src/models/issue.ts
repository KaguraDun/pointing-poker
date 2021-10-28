enum IssuePriorities {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

// move to server side
const issueList = {
  low: {
    name: 'Low',
    value: 'low',
  },
  medium: {
    name: 'Medium',
    value: 'medium',
  },
  high: {
    name: 'High',
    value: 'high',
  },
};

interface Issue {
  ID: string;
  title: string;
  link: string;
  priority: IssuePriorities;
}
type IssueID = string;

type IssuesRecord = Record<IssueID, Issue>;

export { issueList, IssuePriorities };
export type { Issue, IssueID, IssuesRecord };
