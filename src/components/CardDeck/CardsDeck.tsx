import React from 'react';

import s from '@/CardDeck.scss';
import Card from '@/components/Card/Card';
import SP from '@/images/SP.svg';
import DECK_FIBONACCI from '@/models/deck-fibonacci';

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
