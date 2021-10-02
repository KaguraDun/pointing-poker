/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import s from './Card.scss';

interface Props {
  value: string;
  flip: boolean;
  children?: React.ReactNode;
  handleSelectCard: (value: string) => void;
  blockSelect: boolean;
}

const Card = ({
  value,
  flip,
  handleSelectCard,
  blockSelect,
  children,
}: Props) => {
  const handleClick = () => {
    if (blockSelect) return;

    handleSelectCard(value);
  };

  return (
    <div className={s.card} onClick={handleClick}>
      {!flip ? (
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
};

export default Card;
