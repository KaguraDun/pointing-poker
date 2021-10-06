/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import s from './Card.scss';
import DeleteIcon from '@/icons/delete.svg';

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
          <div className={s.center}>{children}</div>
          <div className={s.cardBottom}>{value}</div>
        </div>
      ) : (
        <div className={s.cardBack} />
      )}
    </div>
  );
};

export default Card;
