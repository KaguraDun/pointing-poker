import React from 'react';

import s from './ScoreCard.scss';

interface Props {
  score: string;
  key: number;
}

const ScoreCard = ({ score, key }: Props) => (
  <div key={key} className={s.scoreCard}>
    <h4 className={s.score}>{score}</h4>
  </div>
);

export default ScoreCard;
