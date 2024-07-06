import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket): any {
    console.log(`on connect called : ${socket.id}`);
  }

  @SubscribeMessage('enter_chat')
  enterChat(
    // 방의 ID들을 리스트로 받는다.
    @MessageBody() data: number[],
    @ConnectedSocket() socket: Socket,
  ) {
    for (const chatId of data) {
      // socket.join()
      socket.join(chatId.toString());
    }
  }

  // socket.on('send_message', (message) => {console.log(message)});
  @SubscribeMessage('send_message')
  sendMessage(
    @MessageBody() message: { message: string; chatId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(message);
    // this.server.emit('receive_message', 'hello from server');
    this.server
      .in(message.chatId.toString()) // 특정 Room에만 전송
      .emit('receive_message', message.message);
  }
}
