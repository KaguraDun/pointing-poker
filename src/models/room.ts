import { Member } from '@/models/member';

import { Decks } from './deck';

const roomEvents = {
  CREATE_ROOM: 'CREATE_ROOM:',
  GET_ROOM_FROM_CLIENT: 'GET_ROOM_FROM_CLIENT',
  GET_ROOM_FROM_SERVER: 'GET_ROOM_FROM_SERVER',
  GET_ROOM_STATUS_FROM_CLIENT: 'GET_ROOM_STATUS_FROM_CLIENT',
  GET_ROOM_STATUS_FROM_SERVER: 'GET_ROOM_STATUS_FROM_SERVER',
  START_GAME: 'START_GAME',
  GAME_BEGUN: 'GAME_BEGUN',
  CLOSE_ROOM: 'CLOSE_ROOM',
  ROOM_CLOSED: 'ROOM_CLOSED',
  CONNECT_TO_ROOM: 'CONNECT_TO_ROOM',
  USER_CONNECTED: 'USER_CONNECTED',
  DISCONNECT_FROM_ROOM: 'DISCONNECT_FROM_ROOM',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  GET_AVAILABLE_ROOMS: 'GET_AVAILABLE_ROOMS',
  GET_USERS_FROM_ROOM: 'GET_USERS_FROM_ROOM',
};

interface Room {
  ID: string;
  owner: string;
  users: Member[];
  settings: Settings;
}

interface Settings {
  dealerAsPlayer: boolean;
  decks: Decks[];
  currentDeck: string;
  newPlayersJoinWithAdmit: boolean;
  autoTurnOver: boolean;
  enableTimer: boolean;
  roundDurationSeconds: number;
}

export { roomEvents };
export type { Room, Settings };
