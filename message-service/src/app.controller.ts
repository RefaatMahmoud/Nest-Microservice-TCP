import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService, Message } from './app.service';
import {
  MICROSERVICES_EVENTS,
  MICROSERVICES_ROUTES,
} from './microservices/constants';
import { createUserEvent } from './microservices/events/createUserEvent';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern(MICROSERVICES_EVENTS.USER_CREATED)
  handleUserCreate(data: createUserEvent) {
    this.appService.handleUserCreate(data);
  }

  @Post('/add-message')
  addMessage(@Body() messageReq: Message) {
    this.appService.addMessage(messageReq);
  }

  @MessagePattern({ cmd: MICROSERVICES_ROUTES.GET_ALL_MESSAGES })
  getMessages() {
    return this.appService.getMessages();
  }
}
