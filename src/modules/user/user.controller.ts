import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('api/users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@Req() req: any): Promise<any> {
        const userId = req.user.id;
        return await this.userService.findUserById(userId);
    }
}