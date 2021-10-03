import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import IssueCard from '../IssueCard/IssueCard';
import IssueCardNew from '../IssueCard/IssueCardNew';
import s from './IssueList.scss';

const IssueList = () => {
  const selector = ({ room }: RootState) => room.room.issues;
  const issues = useSelector(selector);
  if (issues) {
    const issuesList = Object.values(issues).map((value) => (
      <IssueCard
        key={value.title}
        link={value.link}
        priority={value.priority}
        title={value.title}
      />
    ));

    return (
      <div className={s.issueList}>
        {issuesList}
        <IssueCardNew />
      </div>
    );
  }
  return (
    <div className={s.issueList}>
      <IssueCardNew />
    </div>
  );
};

export default IssueList;
