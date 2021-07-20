import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MessageRequest } from "src/request/message.request";

import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Get('/:id')
  getByConversationId(@Param('id') id) {
    return this.messagesService.getByConversationId(id);
  }

  @Post()
  sendMessage(@Body() body: MessageRequest) {
    return this.messagesService.sendMessage(body);
  }
}