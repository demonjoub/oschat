import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { MessageRequest } from "src/request/message.request";

import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Get('/:id')
  getByConversationId(@Param('id') id, @Query() params) {
    return this.messagesService.getByConversationId(id, params);
  }

  @Post()
  sendMessage(@Body() body: MessageRequest) {
    return this.messagesService.sendMessage(body);
  }
}