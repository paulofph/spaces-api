import { Controller, Get } from '@nestjs/common';
import { SpaceService } from './space.service';

@Controller('api/spaces')
export class SpaceController {
    constructor(
        private readonly spaceService: SpaceService
    ) {}

    @Get()
    // @UseGuards(AuthGuard('jwt'))
    async getSpaces(): Promise<any> {
        return await this.spaceService.findAll()
    }
}
