import { Injectable } from '@nestjs/common';
import { createUserEvent } from './microservices/events/createUserEvent';

export type Message = {
  title: string;
  body: string;
};

@Injectable()
export class AppService {
  private readonly messages: Message[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreate(data: createUserEvent) {
    console.log('message-service', data);
  }

  addMessage(data: Message) {
    this.messages.push(data);
  }

  getMessages() {
    return this.messages;
  }
}
