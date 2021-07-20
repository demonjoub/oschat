import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as ioClient from 'socket.io-client';

import { SendMessageRequest } from "../request/send.message.request";

@Injectable()
export class SocketService {

  private socket: SocketIOClient.Socket;
  public connected = false;

  constructor(private configService: ConfigService) {
    const socketUrl = this.configService.get("API_URL_SOCKET")
    this.socket = ioClient(socketUrl, {});
    this.socket.on('connect', () => {
      this.connected = true;
      console.log("Connected to WS server");
    });
  }

  public createRoom(room: string, userId: string) {
    this.socket.emit("room-created", `${room}`)
    this.socket.emit("new-user", room, userId)
  }

  public sendMessage(request: SendMessageRequest) {
    this.socket.emit("send-chat-message", request.conversationId, request.message, request.userId, request.imageurl, request.juristicname)
  }
}