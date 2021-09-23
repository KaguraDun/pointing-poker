import React from 'react';

import s from './IssueCard.scss';

const IssueCard = (issueNumber: number) => (
  <div className={s.issueCard}>
    <h4 className={s.issue}>Issue{issueNumber}</h4>
  </div>
);

export default IssueCard;
