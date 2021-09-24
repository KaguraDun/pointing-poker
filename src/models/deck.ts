interface Deck {
  value: string;
  icon?: JSX.Element;
}

interface Decks {
  popular: Deck[];
  fibonacci: Deck[];
  powerOfTwo: Deck[];
}

export type { Deck, Decks };
