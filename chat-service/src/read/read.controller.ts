import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { ReadRequest } from "../request/read.request";
import { ReadService } from "./read.service";

@Controller('read')
export class ReadController {
    constructor(private readonly readService: ReadService) {}

    @Post()
    read(@Body() body: ReadRequest) {
        return this.readService.read(body)        
    }
}