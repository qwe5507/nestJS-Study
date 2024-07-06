import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsException
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from "./dto/create-chat.dto";
import { Injectable } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { raw } from "express";
import { EnterChatDto } from "./dto/enter-chat.dto";

@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  constructor(
    private readonly chatsService: ChatsService,
  ) { }

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket): any {
    console.log(`on connect called : ${socket.id}`);
  }

  @SubscribeMessage('create_chat')
  async createChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chat = await this.chatsService.createChat(data);
  }

  @SubscribeMessage('enter_chat')
  async enterChat(
    // 방의 ID들을 리스트로 받는다.
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    // socket.join()
    for (const chatId of data.chatIds) {
      const exists = await this.chatsService.checkIfChatExists(chatId);

      if (!exists) {
        throw new WsException({
          code: 100,
          message: `존재하지 않는 chat 입니다. chatId: ${chatId}`,
        });
      }
    }
    socket.join(data.chatIds.map((x) => x.toString()));
  }

  // socket.on('send_message', (message) => {console.log(message)});
  @SubscribeMessage('send_message')
  sendMessage(
    @MessageBody() message: { message: string; chatId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(message);
    // this.server.emit('receive_message', 'hello from server');
    // this.server
    //   .in(message.chatId.toString()) // 특정 Room에만 전송
    //   .emit('receive_message', message.message);
    socket
      .to(message.chatId.toString()) // 자기를 제외한 대상자들에게 보냄(Broadcasting)
      .emit('receive_message', message.message);
  }
}
