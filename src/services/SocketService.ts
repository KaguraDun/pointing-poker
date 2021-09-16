/* eslint-disable consistent-return */
// https://stackoverflow.com/questions/37876889/react-redux-and-websockets-with-socket-io
import io from 'socket.io-client';

class SocketService {
  ENDPOINT: string;

  socket: SocketIOClient.Socket;

  userID: string;

  constructor() {
    this.ENDPOINT = 'http://localhost:3000/';
    this.userID = null;
  }

  connect() {
    this.socket = io(this.ENDPOINT, { transports: ['websocket', 'polling'] });
    this.userID = this.socket.id;

    return new Promise<void>((resolve, reject) => {
      this.socket.on('connect', () => resolve());
      this.socket.on('connect_error', (error: Error) => reject(error));
    });
  }

  disconnect() {
    return new Promise<void>((resolve) => {
      this.socket.disconnect();
      this.socket = null;
      resolve();
    });
  }

  emit(event: string, data: any) {
    return new Promise<void>((resolve, reject) => {
      if (!this.socket) return reject(new Error('No socket connection.'));

      return this.socket.emit(event, data, (response: any) => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
          return reject(response.error);
        }

        return resolve();
      });
    });
  }

  on(event: string, fun: any) {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise<void>((resolve, reject) => {
      if (!this.socket) return reject(new Error('No socket connection.'));

      this.socket.on(event, fun);
      resolve();
    });
  }
}
const socket = new SocketService();
socket.connect();

export default socket;
