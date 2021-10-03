import React from 'react';

import DeleteIcon from '@/icons/delete.svg';
import EditIssue from '@/icons/edit.svg';
import { Issue } from '@/models/issue';

import s from './IssueCard.scss';

const IssueCard = ({ title, link, priority }: Issue) => (
  <div key={link} className={s.issueCard}>
    <div className={s.wrapper}>
      <strong className={s.subtitle}>{link}</strong>
      <h4 className={s.title}>Issue{title}</h4>
      <em className={s.subtitle}>{priority}</em>
    </div>
    <EditIssue className={s.edit} />
    <DeleteIcon className={s.remove} />
  </div>
);

export default IssueCard;
