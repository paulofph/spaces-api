import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'Hello World!';
  }

  loggedIn(): string {
    return 'Hello LoggedIn!';
  }
}
