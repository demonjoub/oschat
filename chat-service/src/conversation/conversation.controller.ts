import { Body, Controller, Get, Param, Post, Query, Put } from '@nestjs/common';

import { ConversationEntity } from 'src/entity/conversation.entity';
import { CreateConversationRequest } from 'src/request/conversation.request';
import { JoinRequest } from 'src/request/join.request';
import { ConversationService } from './conversation.service';


import { ConversationListResponse, ConversationResponse } from 'src/response/conversation.response';


@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) { }

  @Get()
  getAll(@Query() params): Promise<ConversationListResponse[]> {
    return this.conversationService.getAll(params);
  }

  @Get("/:id")
  getById(@Param('id') id): Promise<ConversationEntity> {
    return this.conversationService.getById(id);
  }

  @Post("create")
  create(@Body() conversationInfo: CreateConversationRequest) {
    return this.conversationService.create(conversationInfo)
  }

  @Post('join')
  join(@Body() request: JoinRequest) {
    return this.conversationService.join(request)
  }
}


//  public async getAll(params: string): Promise<ConversationListResponse[]> {