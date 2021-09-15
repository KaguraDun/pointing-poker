import React from 'react';

import s from './Card.scss';

interface Props {
  value: string;
  flip: boolean;
  children?: React.ReactNode;
}

const Card = ({ value, flip, children }: Props) => (
  <div className={s.card}>
    {flip ? (
      <div className={s.cardFront}>
        <div className={s.cardTop}>{value}</div>
        {children}
        <div className={s.cardBottom}>{value}</div>
      </div>
    ) : (
      <div className={s.cardBack} />
    )}
  </div>
);

export default Card;
