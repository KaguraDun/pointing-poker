import gameApi from '@/services/gameApi';
import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import CardResult from '../Card/CardResult';
import IssueCard from '../IssueCard/IssueCard';
import s from './Result.scss';

const Result = () => {
  const CurrentIssueID = useSelector(
    ({ game }: RootState) => game.game.currentIssueID
  );

  const resultDeck = () => {
    const data = gameApi.prepareDataToSave();
    return data.map((item) => {
      const { link, title, priority, average, ...userScore } = item;
      return Object.entries(userScore).map(([key, value]) => {
        console.log(`${key}: ${value}`);
        return (
          <div className={s.result}>
            <IssueCard
              key={item.link}
              title={item.title}
              link={item.link}
              priority={item.priority}
              ID={CurrentIssueID}
            />
            <CardResult key={value} average={average} value={value} />
          </div>
        );
      });
    });
  };

  return <div className={s.issue}>{resultDeck()}</div>;
};

export default Result;
