import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config"

import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { config } from './config';
import { DatabaseConfig } from './database.config';
import { SocketModule } from './socket/socket.module';
import { ReadModule } from './read/read.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: [`.env.${process.env.NODE_ENV}`]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    ConversationModule,
    MessagesModule,
    UsersModule,
    AuthModule,
    SocketModule,
    ReadModule,
  ],
})
export class AppModule { }
