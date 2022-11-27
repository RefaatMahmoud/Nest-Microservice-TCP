//* act as payload schema for each injected microservices via emit method
export class createUserEvent {
  constructor(private readonly email: string) {}
}
