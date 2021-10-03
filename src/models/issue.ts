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
  title: string;
  link: string;
  priority: IssuePriorities;
}

type IssuesRecord = Record<string, Issue>;

export { issueList, IssuePriorities };
export type { Issue, IssuesRecord };
