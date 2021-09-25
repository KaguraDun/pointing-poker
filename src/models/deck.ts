interface Deck {
  value: string;
  icon?: JSX.Element;
}

interface Decks {
  name: string;
  values: Deck[];
}

export type { Deck, Decks };
