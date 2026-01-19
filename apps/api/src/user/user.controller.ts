import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('me')
export class UserController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req) {
    return req.user;
  }
}
