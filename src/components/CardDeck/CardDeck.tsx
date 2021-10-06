/* eslint-disable react-redux/useSelector-prefer-selectors */
import React from 'react';

import Card from '@/components/Card/Card';
import SP from '@/images/SP.svg';
import { Deck } from '@/models/deck';

import s from './CardDeck.scss';

interface Props {
  deck: Deck[];
  handleSelectCard: (cardValue: string) => void;
  selectedValue: string;
  isCardSelected: boolean;
}

const CardDeck = ({
  deck,
  handleSelectCard,
  selectedValue,
  isCardSelected,
}: Props) => (
  <div className={s.cardsDeck}>
    {deck.map((item) => {
      const isSelected = item.value === selectedValue;

      return (
        <Card
          blockSelect={isCardSelected}
          flip={isSelected}
          handleSelectCard={handleSelectCard}
          value={item.value}
        >
          {item.value}
          <SP className={s.sp} />
        </Card>
      );
    })}
  </div>
);

export default CardDeck;
