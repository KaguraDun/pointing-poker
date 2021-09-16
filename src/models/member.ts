enum UserRoles {
  dealer = 'dealer',
  player = 'player',
  spectator = 'spectator',
}

interface Member {
  ID?: string;
  image: { image: string };
  name: string;
  surname: string;
  position: string;
  role: UserRoles;
}

export { UserRoles };
export type { Member };
