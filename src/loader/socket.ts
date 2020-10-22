import socketio from 'socket.io';
import chalk from 'chalk';
import { Server } from 'https';

let io: socketio.Server;
const activeAuctions: any[] = [];
function init(server: Server) {
  io = socketio(server);
  io.sockets.on('connection', (socket: any) => {
    console.log(chalk.magenta('[SOCKET] connected:', socket.id));
    io.emit('askForUserId');

    socket.on('userIdReceived', (userId: any) => {
      console.log(activeAuctions.length);
      activeAuctions[userId] = socket.id;
    });

    socket.on('disconnect', () => {
      activeAuctions.filter((disconnectedId) => disconnectedId === socket.id);
      console.log(chalk.red('[SOCKET] disconnected', socket.id));
      io.emit('auction disconnected', socket.id);
    });
  });
  return { io, activeAuctions };
}

export default { init };
