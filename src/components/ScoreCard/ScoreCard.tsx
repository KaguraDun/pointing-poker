import React from 'react';

import s from './ScoreCard.scss';

interface Props {
  score: string;
}

const ScoreCard = ({ score }: Props) => (
  <div className={s.scoreCard}>
    <h4 className={s.score}>{score}</h4>
  </div>
);

export default ScoreCard;
