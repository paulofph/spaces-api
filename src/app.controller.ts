import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/xyz')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // root(): string {
  //   console.log('root')
  //   return this.appService.root();
  // }
}
