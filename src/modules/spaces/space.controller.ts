import { Controller, Get, Query } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceFilter } from './models/space-filter';

@Controller('api/spaces')
export class SpaceController {
    constructor(
        private readonly spaceService: SpaceService
    ) {}

    @Get()
    // @UseGuards(AuthGuard('jwt'))
    async getSpaces(@Query() query): Promise<any> {
        const filter = new SpaceFilter(query);
        return await this.spaceService.findAll(filter);
    }
}
