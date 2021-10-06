import React from 'react';
import { useSelector } from 'react-redux';

import gameApi from '@/services/gameApi';
import { RootState } from '@/store';

import CardResult from '../Card/CardResult';
import IssueCard from '../IssueCard/IssueCard';
import s from './Result.scss';

const Result = () => {
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const CurrentIssueID = useSelector(
    ({ game }: RootState) => game.game.currentIssueID
  );

  const resultDeck = () => {
    const data = gameApi.prepareDataToSave();

    return data.map((item) => {
      const { link, title, priority, average, ...userScore } = item;
      return (
        <div className={s.result}>
          <IssueCard
            ID={CurrentIssueID}
            link={item.link}
            priority={item.priority}
            showControls={false}
            title={item.title}
          />
          <div className={s.cards}>
            {Object.entries(userScore).map(([key, value]) => (
              <div className={s.card}>
                <CardResult key={key + value} value={value} />
                <div>Average: {average}</div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };
  return <div className={s.issue}>{resultDeck()}</div>;
};

export default Result;
