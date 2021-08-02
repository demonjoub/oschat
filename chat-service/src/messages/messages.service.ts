import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRequest } from 'src/request/message.request';
import { SendMessageRequest } from 'src/request/send.message.request';
import { SocketService } from 'src/socket/socket.service';
import { Repository, getManager } from 'typeorm';

import { MessagesEntity } from './../entity/messages.entity';
import { ReadEntity } from 'src/entity/read.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messagesRepository: Repository<MessagesEntity>,
    private socketService: SocketService,
    @InjectRepository(ReadEntity)
    private readonly readRepository: Repository<ReadEntity>
  ) { }

  async sendMessage(messageReq: MessageRequest) {
    try {
      const msg = new MessagesEntity();
      msg.conversationId = messageReq.conversationId;
      msg.message = decodeURI(messageReq.message);
      msg.imageurl = messageReq.imageurl || "";
      msg.userId = messageReq.userId;
      msg.status = false;
      msg.juristicname = messageReq.juristicname || "";

      const res = await this.messagesRepository.save(msg)
      // send socket
      const request = new SendMessageRequest();
      request.conversationId = messageReq.conversationId;
      request.message = msg.message;
      request.imageurl = msg.imageurl;
      request.userId = msg.userId;
      request.juristicname = msg.juristicname;
      this.socketService.sendMessage(request);

      // set read 
      const read = await getManager()
        .createQueryBuilder(ReadEntity, "read")
        .where("read.conversationId = :conversationId", { conversationId: messageReq.conversationId })
        .getOne()
      read.isread = true
      read.readBy = messageReq.userId
      const readByMessage = read?.readByMessage ? JSON.parse(read.readByMessage) : {}
      const object = {
        ...readByMessage,
        [messageReq.userId]: {
          messageId: res.id,
          isread: true
        }
      }
      this.readRepository.save(read)
      return res
    } catch (e) {
      throw e
    }
  }

  async getByConversationId(id: string, params: { offset?: string, limit?: string, userId?: string }): Promise<MessagesEntity[]> {
    try {
      const userId = params.userId
      const read = await getManager()
        .createQueryBuilder(ReadEntity, "read")
        .where('read.conversationId = :conversationId', { conversationId: id })
        .getOne()

      let users = {}
      if (read?.readByMessage) {
        users = JSON.parse(read?.readByMessage)
      }

      const messages = await getManager()
        .createQueryBuilder(MessagesEntity, "message")
        .where('message.conversationId = :conversationId', { conversationId: id })
        .offset(Number.parseInt(params.offset))
        .limit(Number.parseInt(params.limit))
        .getMany();

      const res = messages.map(message => {
        const messageId = users[userId]?.messageId
        let read = false
        if (messageId && message.id <= messageId) {
          read = true
        }
        return {
          ...message,
          isread: read
        }
      })
      return res
    } catch (e) {
      throw e
    }
  }


}
