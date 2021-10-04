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
    {deck.map((item, index) => {
      const isSelected = item.value === selectedValue;

      return (
        <Card
          key={index}
          blockSelect={isCardSelected}
          flip={isSelected}
          handleSelectCard={handleSelectCard}
          value={item.value}
        >
          <SP />
        </Card>
      );
    })}
  </div>
);

export default CardDeck;
