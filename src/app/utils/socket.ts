// import { Server } from 'http';
// import { Server as SocketIOServer, Socket } from 'socket.io';

// let io: SocketIOServer;

// export function initializeSocket(server: Server): void {
//   io = new SocketIOServer(server);

//   io.on('connection', (socket: Socket) => {
//     console.log('New client connected');
//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });
// }

// export function getIo(): SocketIOServer {
//   if (!io) {
//     throw new Error('Socket.io has not been initialized');
//   }
//   return io;
// }