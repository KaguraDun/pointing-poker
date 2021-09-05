import React from 'react';

import CoffeeCupIcon from '@/icons/coffee-cup.svg';

import Deck from './deck';

const DECK_POPULAR: Deck[] = [
  {
    value: '0',
  },
  {
    value: '1/2',
  },
  {
    value: '1',
  },
  {
    value: '2',
  },
  {
    value: '3',
  },
  {
    value: '5',
  },
  {
    value: '8',
  },
  {
    value: '13',
  },
  {
    value: '20',
  },
  {
    value: '40',
  },
  {
    value: '?',
  },
  {
    value: '∞',
  },
  {
    value: 'cup of coffee',
    icon: <CoffeeCupIcon />,
  },
];

export default DECK_POPULAR;
