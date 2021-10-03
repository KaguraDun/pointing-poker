enum IssuePriorities {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

interface Issue {
  title: string;
  link: string;
  priority: IssuePriorities;
}

type IssuesRecord = Record<string, Issue>;

export { IssuePriorities };
export type { Issue, IssuesRecord };
