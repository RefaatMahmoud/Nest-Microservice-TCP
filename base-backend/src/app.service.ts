import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createUserDto } from './dto/createUserDto';
import {
  MICROSERVICES_CLIENTS,
  MICROSERVICES_EVENTS,
  MICROSERVICES_ROUTES,
} from './microservices/constants';
import { createUserEvent } from './microservices/events/createUserEvent';

@Injectable()
export class AppService {
  //* as temporary DB
  private readonly users: createUserDto[] = [];

  constructor(
    @Inject(MICROSERVICES_CLIENTS.MESSAGE_SERVICE)
    private readonly messageServiceClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World From base service';
  }

  createUser(createUserReq: createUserDto) {
    this.users.push(createUserReq);
    return this.messageServiceClient.emit(
      MICROSERVICES_EVENTS.USER_CREATED,
      new createUserEvent(createUserReq.email),
    );
  }

  getMessages() {
    return this.messageServiceClient.send(
      { cmd: MICROSERVICES_ROUTES.GET_ALL_MESSAGES },
      {},
    );
  }
}
