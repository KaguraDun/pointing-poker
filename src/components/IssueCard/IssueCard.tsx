import React from 'react';
import EditIssue from '@/icons/edit.svg';
import DeleteIcon from '@/icons/delete.svg';
import s from './IssueCard.scss';

const IssueCard = (issueNumber: number) => (
  <div className={s.issueCard}>
    <div className={s.wrapper}>
      <strong className={s.subtitle}>Current</strong>
      <h4 className={s.title}>Issue{issueNumber}</h4>
      <em className={s.subtitle}>Low priority</em>
    </div>
    <EditIssue className={s.edit} />
    <DeleteIcon className={s.remove} />
  </div>
);

export default IssueCard;
