import React from 'react';

import s from './ScoreCard.scss';

interface Props {
  score: string;
  key: number;
}

const ScoreCard = ({ score, key }: Props) => (
  <div key={key} className={s.scoreCard}>
    <p className={s.score}>{score}</p>
  </div>
);

export default ScoreCard;
