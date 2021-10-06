/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import s from './CardResult.scss';

interface Props {
  value: string;
}

const CardResult = ({ value }: Props) => (
  <div key={value} className={s.card}>
    <div className={s.cardTop}>{value}</div>
    <div className={s.average}>{value}</div>
    <div className={s.cardBottom}>{value}</div>
  </div>
);

export default CardResult;
