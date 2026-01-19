import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('me')
export class UserController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req: ExpressRequest & { user: any }) {
    return req.user;
  }
}
