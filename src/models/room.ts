import Game from '@/models/game';
import { Member } from '@/models/member';

import { DecksRecord } from './deck';
import { IssuesRecord } from './issue';

const roomEvents = {
  CREATE_ROOM: 'CREATE_ROOM:',
  GET_ROOM_FROM_CLIENT: 'GET_ROOM_FROM_CLIENT',
  GET_ROOM_FROM_SERVER: 'GET_ROOM_FROM_SERVER',
  GET_ROOM_STATUS_FROM_CLIENT: 'GET_ROOM_STATUS_FROM_CLIENT',
  GET_ROOM_STATUS_FROM_SERVER: 'GET_ROOM_STATUS_FROM_SERVER',
  START_GAME: 'START_GAME',
  UPDATE_GAME_STATE: 'UPDATE_GAME_STATE',
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
  users: Record<string, Member>;
  issues: IssuesRecord;
  settings: Settings;
  game: Game;
}

interface Settings {
  dealerAsPlayer: boolean;
  decks: DecksRecord;
  currentDeck: string;
  newPlayersJoinWithAdmit: boolean;
  autoTurnOver: boolean;
  enableTimer: boolean;
  roundDurationSeconds: number;
}

export { roomEvents };
export type { Room, Settings };
