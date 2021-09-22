import { Member } from '@/models/member';

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
  DISCONNECT_FROM_ROOM: 'DISCONNECT_FROM_ROOM',
  GET_AVAILABLE_ROOMS: 'GET_AVAILABLE_ROOMS',
  GET_USERS_FROM_ROOM: 'GET_USERS_FROM_ROOM',
};

interface Room {
  ID: string;
  owner: Member;
  users: Member[];
  settings: any;
}

export { roomEvents };
export type { Room };
