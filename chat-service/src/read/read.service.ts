import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { ReadRequest } from './../request/read.request';
import { ReadEntity } from './../entity/read.entity'

@Injectable()
export class ReadService {
  constructor(
    @InjectRepository(ReadEntity)
    private readonly readRepository: Repository<ReadEntity>,
  ) { }


  async read(body: ReadRequest): Promise<ReadEntity> {
    try {
      const r = new ReadEntity()
      r.conversationId = body.conversationId;
      r.isread = body.isread
      r.readBy = body.member;
    
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
