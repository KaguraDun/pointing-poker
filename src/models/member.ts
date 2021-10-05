enum UserEvents {
  ADD_USER_FROM_CLIENT = 'ADD_USER_FROM_CLIENT',
}

enum UserRoles {
  dealer = 'dealer',
  player = 'player',
  spectator = 'spectator',
}

interface Member {
  ID?: string;
  image: string;
  name: string;
  surname: string;
  position: string;
  role: UserRoles;
}

export { UserEvents, UserRoles };
export type { Member };
