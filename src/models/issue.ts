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

export { IssuePriorities };
export type { Issue };
