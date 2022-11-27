import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { createUserDto } from './dto/createUserDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/add-user')
  createUser(@Body() createUserReq: createUserDto) {
    return this.appService.createUser(createUserReq);
  }

  @Get('/messages')
  getMessages() {
    return this.appService.getMessages();
  }
}
