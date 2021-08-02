import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadEntity } from './../entity/read.entity';
import { ReadController } from './read.controller';
import { ReadService } from './read.service';
import { MessagesEntity } from 'src/entity/messages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReadEntity, MessagesEntity])
  ],
  controllers: [ReadController],
  providers: [ReadService]
})
export class ReadModule { }
