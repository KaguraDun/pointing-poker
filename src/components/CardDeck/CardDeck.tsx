import React from 'react';

import Card from '@/components/Card/Card';
import SP from '@/images/SP.svg';
import { Deck } from '@/models/deck';

import s from './CardDeck.scss';

interface Props {
  deck: Deck[];
}

const CardDeck = ({ deck }: Props) => (
  <div className={s.cardsDeck}>
    {deck.map((item) => (
      <Card key={item.value} flip value={item.value}>
        <SP />
      </Card>
    ))}
  </div>
);

export default CardDeck;
