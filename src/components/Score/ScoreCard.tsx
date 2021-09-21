import React from 'react';
import s from './ScoreCard.scss';

const ScoreCard = (score: string) => (
  <div className={s.scoreCard}>
    <h4 className={s.score}>{score}SP</h4>
  </div>
);

export default ScoreCard;
