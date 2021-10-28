import React from 'react';

import s from './ScoreCard.scss';

interface Props {
  score: string;
}

const ScoreCard = ({ score }: Props) => (
  <div className={s.scoreCard}>
    <p className={s.score}>{score}</p>
  </div>
);

export default ScoreCard;
