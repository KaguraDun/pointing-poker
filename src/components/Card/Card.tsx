import s from 'Card.scss';
import React from 'react';

interface Props {
  value: string;
  icon: string;
}

const Card = ({ value, icon }: Props) => (
  <div className={s.card}>
    <div className={s.cardFront}>
      <div className={s.cardTop}>{value}</div>
      <div className={s.cardCenter}>
        <img alt="" className={s.cardImage} src={icon} />
      </div>
      <div className={s.cardBottom}>{value}</div>
    </div>
    <div className={s.cardBack} />
  </div>
);

export default Card;
