import React from 'react';

import SP from '@/images/SP.svg';
import DECK_FIBONACCI from '@/models/deck-fibonacci';

import Card from '../Card/Card';
import s from './CardDeck.scss';

const CardsDeck = () => (
  <div className={s.cardsDeck}>
    {DECK_FIBONACCI.map((item) => (
      <Card key={item.value} flip value={item.value}>
        <SP />
      </Card>
    ))}
  </div>
);

export default CardsDeck;
