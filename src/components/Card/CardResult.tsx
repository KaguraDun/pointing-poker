/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import s from './CardResult.scss';

interface Props {
  value: number;
  icon?: JSX.Element;
  key: string;
  children?: React.ReactNode;
}

const CardResult = ({ value, children, key }: Props) => (
  <div className={s.card} key={key}>
    <div className={s.cardFront}>
      <div className={s.cardTop}>{value}</div>
      {children}
      <div className={s.cardBottom}>{value}</div>
    </div>
  </div>
);

export default CardResult;
