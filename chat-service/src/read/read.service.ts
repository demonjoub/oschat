import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getMetadataArgsStorage } from 'typeorm';

import { ReadRequest } from './../request/read.request';
import { ReadEntity } from './../entity/read.entity'
import { MessagesEntity } from 'src/entity/messages.entity';
import { ConversationEntity } from 'src/entity/conversation.entity';

@Injectable()
export class ReadService {
  constructor(
    @InjectRepository(ReadEntity)
    private readonly readRepository: Repository<ReadEntity>,
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>
  ) { }

  async read(body: ReadRequest): Promise<ReadEntity> {
    try {
      const r = new ReadEntity()
      r.conversationId = body.conversationId;
      r.isread = body.isread
      r.readBy = body.member;

      const conversation = await getManager()
        .createQueryBuilder(ConversationEntity, "conversation")
        .where("conversation.conversationId = :conversationId", { conversationId: body.conversationId })
        .getOne()

      const messages = await getManager()
        .createQueryBuilder(MessagesEntity, "msg")
        .where("msg.conversationId = :conversationId", { conversationId: body.conversationId })
        .orderBy("createAt", "DESC")
        .getOne()

      const read = await getManager()
        .createQueryBuilder(ReadEntity, "read")
        .where("read.conversationId = :conversationId", { conversationId: body.conversationId })
        .getOne()
      
      const readByMessage = read?.readByMessage ? JSON.parse(read.readByMessage) : {}

      const object = {
        ...readByMessage,
        [body.member]: {
          messageId: messages.id,
          isread: true
        }
      }
      r.readByMessage = JSON.stringify(object)
      const res = await this.readRepository.save(r)
      return res;
    } catch (e) {
      throw e
    }
  }

  async getReadByConversationId(conversationId: string): Promise<ReadEntity> {
    try {
      const res = await getManager()
        .createQueryBuilder(ReadEntity, "read")
        .where('read.conversationId = :id', { id: conversationId })
        .getOne()
      return res;
    } catch (e) {
      throw e
    }
  }
}
