interface Deck {
  value: string;
  icon?: JSX.Element;
}

interface Decks {
  name: string;
  values: Deck[];
}

type DecksRecord = Record<string, Decks>;

export type { Deck, Decks, DecksRecord };
