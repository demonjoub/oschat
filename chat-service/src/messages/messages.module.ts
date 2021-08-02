import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketModule } from '../socket/socket.module';

import { MessagesEntity } from './../entity/messages.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ReadEntity } from 'src/entity/read.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessagesEntity, ReadEntity]),
    SocketModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule { }
