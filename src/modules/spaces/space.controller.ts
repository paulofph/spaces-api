import { Controller, Get, Query, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceFilter } from './models/space-filter';
import { SpaceModel } from './models/space.model';
import { Response } from 'express';

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

    @Post()
    async postSpace(@Body() space: SpaceModel, @Res() res: Response): Promise<any> {
        const result = await this.spaceService.saveSpace(space)
        
        return res.send(result)
            .sendStatus(HttpStatus.OK);
    }

    @Get('types')
    async spaceTypes(): Promise<any>{
        return await this.spaceService.getTypes()
    }
}
