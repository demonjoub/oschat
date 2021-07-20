import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"

import { ConversationController } from './conversation.controller'
import { ConversationService } from './conversation.service'
import { ConversationEntity, } from './../entity/conversation.entity'
import { SocketModule } from '../socket/socket.module';
import { ReadEntity } from './../entity/read.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConversationEntity, ReadEntity]),
    SocketModule,
  ],
  controllers: [ConversationController],
  providers: [ConversationService]
})
export class ConversationModule { }
