// // infrastructure/socket-io.service.ts
// import { Server } from 'socket.io';
// import { WebsocketServiceOutputPort } from '../../../auction-management/application/output-ports/websocket.service.output-port';
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class SocketIoService implements WebsocketServiceOutputPort {
//   private server: Server;

//   setServer(server: Server) {
//     this.server = server;
//   }

//   emitToAllClients(event: string, data: any): void {
//     this.server.emit(event, data);
//   }

//   emitToClient(socketId: string, event: string, data: any): void {
//     const socket = this.server.sockets.sockets.get(socketId);
//     if (socket) {
//       socket.emit(event, data);
//     }
//   }
// }
